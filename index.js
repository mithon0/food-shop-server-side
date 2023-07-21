const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app =express();
const port =process.env.PORT || 5000;

// middleWere

app.use(express.json());
app.use(cors());






const uri = `mongodb+srv://food-shop1212:GVkCGXTdWpvyNoSi@cluster0.3kcnoe6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const userCollections =client.db("foodShop").collection("users");


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
      
      
app.post('/users',async(req,res)=>{
        const user =req.body;
        const query ={email: user.email};
        console.log(user.email);
        const existingUser =userCollections.findOne(query);
        console.log(existingUser);
        
        const result =await userCollections.insertOne(user);
        res.send(result)
        
      })
      app.get('/users',async(req,res)=>{
        const data =await userCollections.find().toArray();
        
        res.send(data)
      })
      app.delete('/user/:email',async(req,res)=>{
        const email =req.params.email;
        const query ={email:email}
        const result =await userCollections.deleteOne(query);
        if (result.deletedCount === 1) {
          console.log("Successfully deleted one document.");
        } else {
          console.log("No documents matched the query. Deleted 0 documents.");
        }

      })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
  res.send("FooD is cooking")
});
app.listen(port,()=>{
    console.log(`Food in cooking on port ${port}`)
    // console.log(process.env.DB_USER);
});