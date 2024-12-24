const express = require("express");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validate")
const jwt = require("jsonwebtoken");
const ConnectionRequest = require("../models/connectionRequest");

const { userAuth } = require("../middlewares/authValidate")

const tinderRouter = express.Router();

tinderRouter.patch("/profile/edit", async (req, res) => {
    try {
        // if (!validateEditProfileData) {
        //     throw new Error("Invalid Edit Profile")
        // }
        const cookies = req.cookies;
        const { token } = cookies;
        const decodedToken = await jwt.verify(token, "Nirpan@1995")
        const { userId } = decodedToken;
        const loggedInUser = await User.findOne({ _id: userId });
        Object.keys(req.body).forEach((key) =>
            loggedInUser[key] = req.body[key]
        )

        await loggedInUser.save()

        res.json({
            message: `${loggedInUser} , your Profile is updated`,
            data: loggedInUser,
        })
        res.send("Profile updated successfully")

    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
})

tinderRouter.post("/request/send/:status/:toUserId", async (req, res) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        const decodedToken = await jwt.verify(token, "Nirpan@1995")
        const { userId } = decodedToken;
        const user = await User.findOne({ _id: userId });
        // const users = await User.find({ _id: decodedToken.userId })
        const fromUserId = user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"]

        if (!allowedStatus.includes(status)) {
            res.status(400).json({ message: "Invalid status type : " + status });
        }

        const existingConnectionReq = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        if (existingConnectionReq) {
            return res.status(400).json({ message: "connection Request Already exit!" })

        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();

        res.json({
            message: "Connections Request send successfully!",
            data
        })


    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }

})

tinderRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    console.log(req.params);
    try {
        // const cookies = req.cookies;
        // const { token } = cookies;
        // const decodedToken = await jwt.verify(token, "Nirpan@1995")
        // const { userId } = decodedToken;
        // const loggedInUser = await User.findOne({ _id: userId });
        const loggedInUser = req.user;

        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"]

        if (!allowedStatus.includes(status)) {
            res.status(400).json({ message: "Invalid status type : " + status });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })

        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection not found" })
        }

        connectionRequest.status = status;

        const data = connectionRequest.save();

        res.status(200).json({ message: "Connection request " + status, data })


    } catch (error) {
        res.status(400).send("ERROR :" + error.message);

    }

})

tinderRouter.get("/request/recieved", async (req, res) => {
    try {
        // const loggedInUser = req.user;
        const cookies = req.cookies;
        const { token } = cookies;
        const decodedToken = await jwt.verify(token, "Nirpan@1995")
        const { userId } = decodedToken;
        const loggedInUser = await User.findOne({ _id: userId });

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["name", "email"]);

        res.json({
            message: "Data Fetched Successfully",
            data: connectionRequests
        })

    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }

})


tinderRouter.get("/connections", async (req, res) => {

    try {
        const cookies = req.cookies;
        const { token } = cookies;
        const decodedToken = await jwt.verify(token, "Nirpan@1995")
        const { userId } = decodedToken;
        const loggedInUser = await User.findOne({ _id: userId });
        // const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or: [
                {
                    toUserId: loggedInUser._id,
                    status: "accepted"
                },
                {
                    fromUserId: loggedInUser._id,
                    status: "accepted"
                }
            ]
        }).populate("fromUserId", ["name", "email"]);

        const data = connections.map((row) => {
            if (row.fromUserI._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }

            return row.fromUserId;
        });


        res.json({ data })

    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }

})



// tinderRouter.post("request/send/:status/:toUserId", async (req , res) =>{
//     console.log("hiiti")
//     try {
//         const cookies = req.cookies;
//         const { token } = cookies;
//         const decodedToken = await jwt.verify(token, "Nirpan@1995")
//         const fromUserId = decodedToken.userId;
//         const toUserId = req.params.toUserId;
//         const status = req.params.status;

//         console.log("hiiti", fromUserId , toUserId , status  )

//         const ConnectionRequest = new ConnectionRequest({
//             fromUserId,
//             toUserId,
//             status
//         })

//         const data = await ConnectionRequest.save();

//         res.json({
//             message:"Connections Request send successfully!",
//             data,
//         })


//     } catch (error) {
//         res.status(400).send("ERROR : " + error.message);
//     }

// })


// tinderRouter.patch("/profile/password", async (req, res) => {
//     try {
//         if (!validateEditProfileData) {
//             throw new Error("Invalid Edit Profile")
//         }
//         const loggedInUser = req.user;
//         Object.keys(req.body).forEach((key) =>
//             loggedInUser[key] = req.body[key]
//         )

//         await loggedInUser.save()

//         // res.json({
//         //     message:`${loggedInUser} , your Profile is updated`,
//         //     data: loggedInUser;
//         // })
//         res.send("Profile updated successfully")

//     } catch (error) {
//         res.status(400).send("Error : " + error.message)
//     }
// })




module.exports = tinderRouter;