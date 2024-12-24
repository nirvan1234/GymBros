const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const { userAuth } = require("../middlewares/authValidate");
const ConnectionRequest = require("../models/connectionRequest");


const signalRouter = express.Router();




signalRouter.get("/user/:userId", async (req, res) => {

    try {
        const cookies = req.cookies;
        const { token } = cookies;
        const decodedToken = await jwt.verify(token, "Nirpan@1995")
        console.log("decodedToken", decodedToken);
        const userId = req.params.userId;
        const users = await User.find({ _id: { $ne: userId } })
        res.json(users);

    } catch (error) {
        console.log("error", error);
    }

})



signalRouter.post("/sendrequest", async (req, res) => {
    const { senderId, recieverId, message , name } = req.body;
    // const cookies = req.cookies;
    // const { token } = cookies;
    // const decodedToken = await jwt.verify(token, "Nirpan@1995")
    // console.log("decodedToken", decodedToken);
    // const reciever = await User.findOne(recieverId);
    const connectionRequest = await User.findOne({
        name: name,
    })
    // const reciever = await User.findById({ _id: recieverId });
    console.log("reciever",  connectionRequest,  req.body);
    if (!connectionRequest) {
        return res.status(404).json({ message: "Reciever not found" })
        // return new throw error();
    }
    // reciever.requests.push({ from: senderId, message })

    connectionRequest.requests.push({ from: senderId, message: message });
    await connectionRequest.save()
    res.status(200).json({ message: "Message send successfully" })

})




signalRouter.get("/getrequests/:userId", async (req, res) => {
    try {
        // const cookies = req.cookies;
        // const { token } = cookies;
        // const decodedToken = await jwt.verify(token, "Nirpan@1995")
        console.log(req.params.userId);
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId }).populate('requests.from',["name", "email"])
        // const user = await User.findOne({ name: name});
        // const populateUser = await user.populate('requests.from', 'name email',);
        console.log("user", user);
        if (user) {
            res.json(user.requests);
        } else {
            res.status(400);
            throw new Error("User Not Found")
        }
    } catch (error) {
        console.log(error);
    }
})



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

module.exports = signalRouter;