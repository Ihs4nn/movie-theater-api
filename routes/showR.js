//Home of the definitions
const { Router } = require("express");
const showRouter = Router();
const { User, Show } = require("../models");
const { body, validationResult } = require('express-validator')

// //Validation functions
// async function ratingValid (req, res, next){
//     req.showRate = await Show.findByPk(req.params.num);
//     if(req.showRate.rating === "null"){
//         res.sendStatus(404).send("Error");
//     }
//     next()
// }

//GET all Shows
showRouter.get("/", async (req, res) => {
    const allShows = await Show.findAll();
    res.status(200).send(allShows);
})

//GET one Shows
showRouter.get("/:num", async (req, res) => {
    const oneShow = await Show.findByPk(req.params.num);
    res.status(200).send(oneShow);
})

//GET Shows in a particular genre [req.params]
showRouter.get("/genres/:category", async (req, res) => {
    const allCategory = await Show.findAll({
        where: {genre: req.params.category}
    })
    res.status(200).send(allCategory);
})

//PUT updating rating of a Show that has been watched
showRouter.put("/:num/watched",
    
    body('rating').not().isEmpty()
    .withMessage("Cant leave it blank!").custom(value => !/\s/.test(value))
    .withMessage("Cant have white spaces!"),
    
    async (req, res) => {

        const error = validationResult(req);
        if(!error.isEmpty()){
            res.status(401).send(error);
        }        
        const showRate = await Show.findByPk(req.params.num);
        await showRate.update({
            rating: req.body.rating
        })
        res.status(200)
})

//PUT update the status of a Show
showRouter.put("/:num/updates",     
    body('status').not().isEmpty()
    .withMessage("Cant leave it blank!").custom(value => !/\s/.test(value))
    .withMessage("Cant have white spaces!").isLength({max: 25}).isLength({min: 5})
    .withMessage("Must be between 5-25 characters"),
    
    async(req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            res.status(401).send(error);
        } 

        const showStatus = await Show.findByPk(req.params.num)
        await showStatus.update({
            status: req.body.status
        })
        res.sendStatus(200)
    })

//DELETE a Show
showRouter.put("/:num/delete", async (req, res) =>{
    const findShow = await Show.findByPk(req.params.num);
    await findShow.destroy()
    res.status(200).send("Show deleted!")
})


module.exports = showRouter;