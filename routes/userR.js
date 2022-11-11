//Defining section of the User Route
const { Router } = require("express");
const userRouter = Router();
const { User, Show } = require("../models")
const { body, validationResult } = require('express-validator')

//Validation function for the PUT method

// async function userValidation (req, res, next) {
//     req.show = await Show.findByPk(req.params.showNum)
//     if(req.show.status === "null" || req.show.status.includes(" ") || req.show.status.length > 25 || req.show.status.length < 5){
//         res.sendStatus(404)
//     }
//     next()
// }

//GET all User
userRouter.get("/", async (req, res) => {
    const allUser = await User.findAll();
    res.status(200).send(allUser);
})
//GET one User
userRouter.get("/:num", async (req, res) => {
    const oneUser = await User.findByPk(req.params.num);
    res.status(200).send(oneUser);
})

//GET all shows watched by a User [id.params.req]
userRouter.get("/:num/shows", async (req, res) => {
    const findShows = await Show.findAll({
        where: {userId: req.params.num}
    })
    res.status(200).send(findShows);
})

//PUT update and add a show if a User has watched it
userRouter.put("/:userNum/shows/:showNum", async (req, res) => {
        const user = await User.findByPk(req.params.userNum)
        const show = await Show.findByPk(req.params.showNum)
    //when a user has watched a show it should add that userId to the show
        await show.setUser(user);
        res.status(200).send(show);
})

module.exports = userRouter;