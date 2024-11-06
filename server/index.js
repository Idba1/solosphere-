const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 9000

const app = express()
const corsoptions = {
    origin: ['http://localhost:5173/', 'http://localhost:5174/'],
    Credential: true,
    optionSuccessStatus: 2000,
}

app.use(cors(corsoptions))
app.use(express.json())

const uri = `mongodb+srv://solosphere:iWVwKAPVokeFjwvl@cluster0.kfk05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kfk05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // Connect the client to the server	(optional starting in v4.7)
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