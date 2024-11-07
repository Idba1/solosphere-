const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 9000

const app = express()
const corsoptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    Credential: true,
    optionSuccessStatus: 2000,
}

app.use(cors(corsoptions))
app.use(express.json())

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
        app.post('/bid', async (req, res) => {
            const bidData = req.body
            console.log(bidData);
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
        app.get('/jobs/:email', async (req, res) => {
            const email = req.params.email
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