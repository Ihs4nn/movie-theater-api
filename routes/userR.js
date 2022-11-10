//Defining section of the User Route
const { Router } = require("express");
const userRouter = Router();
const User = require("../models/User");
const Show = require("../models/Show");

//Validation function for the PUT method

//GET all User
userRouter.get("/", async (req, res) => {
    const allUser = await User.findall();
    res.send(allUser);
})
//GET one User
userRouter.get("/:num", async (req, res) => {
    const oneUser = await User.findByPk(req.params.num);
    res.send(oneUser);
})

//GET all shows watched by a User [id.params.req]
userRouter.get("/:num/shows", async (req, res) => {
    const findShows = await Show.findAll({
        where: {userId: req.params.num}
    })
    res.send(findShows);
})
//PUT update and add a show if a User has watched it
