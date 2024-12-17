
const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken';
const User = require("../models/user")


const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        const decodedToken = await jwt.verify(token, "Nirvan@1995")
        const { _id } = decodedToken;
        const user = await User.findById((_id));
        if (!user) {
           console.log("user Not found");
           throw new Error("user not found");
        }
        req.user = user;
        next();

    } catch (error) {
       res.status(500).message("");
    }
}

exports.molule = userAuth;