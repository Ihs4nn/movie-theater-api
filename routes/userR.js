//defines routes
const { Router } = require("express");
const userRouter = Router();
const User = require("../models/User");
//make function

//GET all User
userRouter.get("/", async (req, res) => {
    const allUser = await User.findall();
    res.send(allUser);
})

//GET one User

//GET all shows watched by a User [id.params.req]

//PUT update and add a show if a User has watched it
