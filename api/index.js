const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const connectDB = require("./config/database")

const crypto = require('crypto');

const app = express();
const port = 8000;

const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const jwt = require("jsonwebtoken");


connectDB().
    then(() => {
        console.log("Database connection established");
        app.listen(4000, () => {
            console.log("Server is listening at 4000...")
        })
    }).catch(() => {
        console.log("Database connection cannnot be established");
    })

const User = require("./models/user")

const Message = require("./models/message")

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;



    const newUser = new User({ name, email, password })

    newUser.save().then(
        () => {
            res.status(200).json({ message: "user registered successfully!!" })
        }
    ).catch(error => {
        console.log("Error registering");
        res.status(500).json({ message: "Error registering the user" })
    }
    )

})


app.post("/login",async (req, res, register) =>{

    try {
        const {email, password} = req.body;
        const user = User.findOne({email});
        if(!user){
          return res.status(401).json({message:"Email is invalid"})
        }

        const secretKey = crypto.randomBytes(32).toString('hex');

        const token = jwt.sign({userId: user._id}, secretKey);

        res.status(200).json({token});

        if(user.password !== password){
          return res.status(401).json({message:"Password is invalid"})
        }

    } catch (error) {
        res.status(500).json({message:"Error in Login"})
    }

})
