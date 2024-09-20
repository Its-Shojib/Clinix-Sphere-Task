const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
let cors = require('cors')

app.use(cors({
    origin: [
        'http://localhost:5173', 'https://health-care-tracking.netlify.app',
    ],
    credentials: true
}))
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oglq0ui.mongodb.net/?retryWrites=true&w=majority`;

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
        await client.connect();

        const userCollections = client.db("Health-Tracking-DB").collection('Users');
        const recordCollections = client.db("Health-Tracking-DB").collection('Records');


        // ============================ User Registration API��===========================
        app.post('/register', async (req, res) => {
            try {
                const user = req.body;
                const result = await userCollections.insertOne(user);
                res.json({
                    message: 'User registered successfully',
                    insertedId: result.insertedId._id
                })
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Failed to register user' })
            }
        });

        app.post('/health-records', async (req, res) => {
            try {
                const currentDate = new Date();
                const newRecord = {
                    ...req.body,
                    createdAt: currentDate.toLocaleString('en-US', {
                        timeZone: 'Asia/Dhaka', 
                        hour12: false
                    }),
                    updatedAt: currentDate.toLocaleString('en-US', {
                        timeZone: 'Asia/Dhaka',
                        hour12: false
                    })
                };
                const result = await recordCollections.insertOne(newRecord);
                if(result.acknowledged === true){
                    res.json({
                        message: 'Health record added successfully',
                        result: true
                    })
                }else{
                    res.json({
                        message: 'Failed to add health record',
                        result: false
                    })
                }
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Failed to add health record' })
            }
        });

        app.get('/health-records', async (req, res) => {
            try {
                const records = await recordCollections.find().toArray();
                res.json(records)
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Failed to fetch records' })
            }
        });

        app.get('/health-records/:id', async (req, res) => {
            try {
                const record = await recordCollections.findOne({ _id: new ObjectId(req.params.id) });
                if (!record) {
                    return res.status(404).json({ message: 'Record not found' })
                }
                res.json(record)
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Failed to fetch record' })
            }
        });

        app.put('/health-records/:id', async (req, res) => {
            try {
                const currentDate = new Date();
                const updatedRecord = {
                    ...req.body,
                    updatedAt: currentDate.toLocaleString('en-US', { 
                        timeZone: 'Asia/Dhaka', 
                        hour12: false
                    })
                };
        
                const result = await recordCollections.updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: updatedRecord }
                );
        
                if (result.modifiedCount === 0) {
                    return res.status(404).json({ 
                        message: 'Record not found',
                        result: false
                     });
                }
        
                res.json({ 
                    message: 'Record updated successfully',
                    result: true
                 });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Failed to update record' });
            }
        });
        

        app.delete('/health-records/:id', async (req, res) => {
            try {
                const result = await recordCollections.deleteOne({ _id: new ObjectId(req.params.id) });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: 'Record not found' })
                }
                res.json({ 
                    message: 'Record deleted successfully',
                    result: true
                 })
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Failed to delete record' })
            }
        })





        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Health Server is Running')
})

app.listen(port, () => {
    console.log(`Health listening on port ${port}`)
})