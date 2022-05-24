const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yhn0w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(cors());
app.use(express.json());

async function run() {
    try {
        await client.connect();
        const toolCollection = client.db('speedUp_Motors').collection('tools');

        app.get('/tool', async (req, res) => {
            const tool = await toolCollection.find().toArray();
            res.send(tool);;

        });

    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello From SpeedUp Motors')
})

app.listen(port, () => {
    console.log(`SpeedUp Motors listening on port ${port}`)
})