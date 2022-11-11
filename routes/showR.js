//Home of the definitions
const { Router } = require("express");
const showRouter = Router();
const { User, Show } = require("../models");

//Validation functions

//GET all Shows
showRouter.get("/", async (req, res) => {
    const allShows = await Show.findAll();
    res.status(200).send(allShows);
})

//GET one Shows
showRouter.get("/shows/:num", async (req, res) => {
    const oneShow = await Show.findByPk(req.params.num);
    res.status(200).send(oneShow);
})

//GET Shows in a particular genre [req.params]

//PUT updating rating of a Show that has been watched

//PUT update the status of a Show

//DELETE a Show



module.exports = showRouter;