const express = require('express')
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
app.get('/', (req, res)=>{
    res.send("hello from solosphere server..!!");
})

app.listen(port,()=>
console.log(`server running port on ${port}`))