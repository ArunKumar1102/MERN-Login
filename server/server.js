const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const PORT = 5000
const app = express();
const MONGB_UR= "mongodb://localhost:27017/ytLogin"


 
app.use(express.json()); 
app.use(cors());
mongoose.connect(MONGB_UR);
const db = mongoose.connection;
db.on('error',(err)=>{
    console.error("Mongodb connection error", err)
})
db.once('open',()=>{
    console.log("Mongodb is connected")
})
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const User = mongoose.model('User', userSchema)
app.post ('/register', async(req,res)=>{
    try{
        const hasspassword = await bcrypt.hashSync(req.body.password,10)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hasspassword ,
        }) ;
        const savedUser = await newUser.save();
        res.status(201).json(savedUser) 
    }
    catch(error){
        console.error('Error during registation',error);
        res.status(500).json({error: "inter server error"});

    }
})

app.listen(PORT);