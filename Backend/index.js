const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
let cors = require('cors')
let cookieParser = require('cookie-parser')
let jwt = require('jsonwebtoken');

app.use(cors({
    origin: [
        'http://localhost:5173', 'https://milon-mela-matrimony.netlify.app',
    ],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());


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

        // middlewares verify token
        const verifyToken = (req, res, next) => {
            console.log('inside verify token', req.headers.authorization);
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'unauthorized access' });
            }
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_PASS, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'unauthorized access' })
                }
                req.decoded = decoded;
                next();
            })
        }


        // =================================JWT Related API👇===============================
        app.post('/jwt', async (req, res) => {
            let user = req.body;
            let token = jwt.sign(user, process.env.ACCESS_TOKEN_PASS, { expiresIn: '1h' });
            res.send({ token })
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