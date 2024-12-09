const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const port = process.env.PORT || 9000

const app = express()
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    // Credential: true,
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// verify jwt middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token
    if (!token) return res.status(401).send({ message: 'unauthorized access' })
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).send({ message: 'unauthorized access' })
            }
            console.log(decoded)

            req.user = decoded
            next()
        })
    }
}

const uri = `mongodb+srv://solosphere:iWVwKAPVokeFjwvl@cluster0.kfk05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kfk05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        const jobscollection = client.db('solosphere').collection('jobs')
        const bidscollection = client.db('solosphere').collection('bids')

        // jwt generate -json web token

        app.post('/jwt', async (req, res) => {
            const { email } = req.body;
            const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '365d',
            });

            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                })
                .send({ success: true });
        });

        //token Clear after logout
        app.get('/logout', (req, res) => {
            res
                .clearCookie('token', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                    maxAge: 0,
                })
                .send({ success: true })
        })

        //    get all jobs
        app.get('/jobs', async (req, res) => {
            const result = await jobscollection.find().toArray()
            res.send(result)
        })

        // get specific job details using job id
        app.get('/job/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await jobscollection.findOne(query)
            res.send(result)
        })

        // Save a bid data in db
        app.post('/bid', verifyToken, async (req, res) => {
            const bidData = req.body
            console.log(bidData);
            // check if its a duplicate request
            const query = {
                email: bidData.email,
                jobId: bidData.jobId,
            }
            const alreadyApplied = await bidscollection.findOne(query)
            console.log(alreadyApplied)
            if (alreadyApplied) {
                return res
                    .status(400)
                    .send('You have already placed a bid on this job.')
            }
            const result = await bidscollection.insertOne(bidData)
            res.send(result)
        })


        // Save a job data in db
        app.post('/job', async (req, res) => {
            const jobData = req.body
            console.log(jobData);
            const result = await jobscollection.insertOne(jobData)
            res.send(result)
        })

        // get all jobs posted by a specific user
        app.get('/jobs/:email', verifyToken, async (req, res) => {
            const tokenEmail = req.user.email
            console.log(tokenEmail);
            const email = req.params.email
            if (tokenEmail !== email) {
                return res.status(403).send({ message: 'forbidden access' })
            }
            const query = { 'buyer.email': email }
            const result = await jobscollection.find(query).toArray()
            res.send(result)
        })
        // app.get('/job/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await jobscollection.findOne(query);
        //     if (result) {
        //         res.send(result);
        //     } else {
        //         res.status(404).send({ message: 'Job not found' });
        //     }
        // })


        // delete a job data from db
        app.delete('/job/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await jobscollection.deleteOne(query)
            res.send(result)
        })


        // update a job in db
        app.put('/job/:id', async (req, res) => {
            const id = req.params.id
            const jobData = req.body
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updateDoc = {
                $set: {
                    ...jobData,
                },
            }
            const result = await jobscollection.updateOne(query, updateDoc, options)
            res.send(result)
        })

        // get all bids for a user by email from db
        app.get('/my-bids/:email', async (req, res) => {
            const email = req.params.email
            const query = { email }
            const result = await bidscollection.find(query).toArray()
            res.send(result)
        })


        // get all bids request from db for job owner
        app.get('/bid-requests/:email', async (req, res) => {
            const email = req.params.email
            const query = { 'buyer.email': email }
            const result = await bidscollection.find(query).toArray()
            res.send(result)
        })

        // update bid status
        app.patch('/bid/:id', async (req, res) => {
            const id = req.params.id
            const status = req.body
            const query = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: status,
            }
            const result = await bidscollection.updateOne(query, updateDoc)
            res.send(result)
        })

        // get all jobs data from db for pagination
        app.get('/all-jobs', async (req, res) => {
            const result = await jobscollection.find().toArray()
            res.send(result)
        })

        // get all jobs data count from db
        app.get('/jobs-count', async (req, res) => {
            const count = await jobscollection.countDocuments()
            res.send({count})
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send("hello from solosphere server..!!");
})

app.listen(port, () =>
    console.log(`server running port on ${port}`))