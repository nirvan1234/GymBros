const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = require("./models/user")
const Message = require("./models/message");
const connectDB = require("./config/database")
const { validateSignUpData } = require("./utils/validate")
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");

// import userAuth from "./middleware/auth"


const crypto = require('crypto');

const app = express();
const port = 8000;


var cors = require('cors');
app.use(cors({ origin: true, credentials: true }));

// cookieParser is a middleware used by server to store our token  and we can get the token for validating all apis hit
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: false }));

//middleware to convert JSON object to javaScript object we can also use exprss.json() in place of bodyParser
app.use(bodyParser.json());




connectDB().
    then(() => {
        console.log("Database connection established");
        app.listen(4000, () => {
            console.log("Server is listening at 4000...")
        })
    }).catch(() => {
        console.log("Database connection cannnot be established");
    })


// const { userAuth } = require("./middleware/auth");

// app.post("/register", async (req, res) => {
//     // validateSignUpData(req)
//     // const { name, email, password } = req.body;
//     // const newUser = new User({ name, email, password })
//     // console.log(req.body);
//     // newUser.save().then(
//     //     () => {
//     //         res.status(200).json({ message: "user registered successfully!!" })
//     //     }
//     // ).catch(error => {
//     //     console.log("Error registering");
//     //     res.status(500).json({ message: "Error registering the user" })
//     // }
//     // )
//     // console.log(validateSignUpData(req));

//     try {
//         validateSignUpData(req);
//         const { name, email, password } = req.body;
//         const passwordHash = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: passwordHash })
//         await newUser.save();
//         res.status(200).json({ message: "user registered successfully!!" })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Error registering the user" })
//     }

// })


// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email: email });
//         if (!user && user.password !== password) {
//             return res.status(401).json({ message: "Email/Password is invalid" })
//         }
//         // const isPasswordValid = await bcrypt.compare(password , user.password)
//         // if (isPasswordValid) {
//         //create a JWT token
//         // const secretKey = crypto.randomBytes(32).toString('hex');
//         console.log("===", user._id);
//         const secretKey = "Nirpan@1995"
//         const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "7d" });


//         //add the token to cookies and send the response back to the user
//         res.cookie("token", token);
//         // res.send("Login Succesfully !!")

//         res.status(200).json({ token });
//         // } else {
//         //     throw new error("Email/Password is invalid");
//         // }

//         // const secretKey = crypto.randomBytes(32).toString('hex');
//         // const token = jwt.sign({ userId: user._id }, secretKey);
//         // res.status(200).json({ token });
//         // if(user.password !== password){
//         //   return res.status(401).json({message:"Password is invalid"})
//         // }

//     } catch (error) {
//         res.status(500).json({ message: "Error in Login" })
//     }

// })


const authRouter = require("./routes/auth");
const signalRouter = require("./routes/signal")

app.use("/", authRouter);
app.use("/", signalRouter);

// app.get("/user/:userId", async (req, res) => {

//     try {
//         const cookies = req.cookies;
//         const { token } = cookies;
//         const decodedToken = await jwt.verify(token, "Nirpan@1995")
//         console.log(decodedToken);
//         const userId = req.params.userId;
//         const users = await User.find({ _id: { $ne: userId } })
//         res.json(users);

//     } catch (error) {
//         console.log("error", error);
//     }

// })

// app.post("/sendrequest", async (req, res) => {
//     const { senderId, recieverId, message } = req.body;
//     const reciever = await User.findOne(recieverId)
//     // const reciever = await User.findById(recieverId);
//     console.log("reciever", reciever, req.body);
//     if (!reciever) {
//         return res.status(404).json({ message: "Reciever not found" })
//         // return new throw error();
//     }
//     // reciever.requests.push({ from: senderId, message })

//     reciever.requests.push({ from: senderId, message: message });
//     await reciever.save()
//     res.status(200).json({ message: "Message send successfully" })

// })


// app.get("/getrequests/:userId", async (req, res) => {
//     try {
//         const cookies = req.cookies;
//         const { token } = cookies;
//         const decodedToken = await jwt.verify(token, "Nirpan@1995")
//         console.log(req.params.userId);
//         const userId = req.params.userId;
//         const user = await User.findOne({ _id: userId });
//         const populateUser = await user.populate('requests.from', 'name email',);
//         if (user) {
//             res.json(user.requests);
//         } else {
//             res.status(400);
//             throw new Error("User Not Found")
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.post("/acceptrequests", async (req, res) => {
//     try {
//         const { userId, requestId } = req.body;
//         const user = await User.findOne(userId);
//         if (!user) {
//             return res.status(400).json({ message: 'user not found' })
//         }
//         console.log(user);
//         const updateUser = await User.findByIdAndUpdate(
//             userId,
//             {
//                 $pull: { requests: { from: requestId } }
//             },
//             { new: true }
//         )

//         if (!updateUser) {
//             return res.status(404).json({ message: 'request not found' })
//         }

//         await findByIdAndUpdate(userId, {
//             $push: { friends: requestId },
//         });

//         const friendUser = await User.findByIdAndUpdate(requestId, {
//             $push: { friends: userId },
//         });

//         if (!friendUser) {
//             return res.status(404).json({ message: 'Friend not found' });
//         }

//         res.status(200).json({ message: 'Request accepted sucesfully' });


//     } catch (error) {

//     }

// })