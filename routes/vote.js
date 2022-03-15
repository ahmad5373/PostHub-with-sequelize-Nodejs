const express = require ("express");
const Router = express.Router();



//Import Vote controller here
const vote_controller = require("../controller/vote_controller");


//End point for create a new vote
Router.post("/createvote" , vote_controller.createvote);


//Retreive all vote
Router.get("/getvote" , vote_controller.getvote );


//Retrieve  vote  with  post
Router.get("/getvotpost" , vote_controller.getvotpost );

//Retrieve  vote  with user and post
Router.get("/getvotpostuser" , vote_controller.getvotpostuser );


// Retrieve a single vote with speciefic id
Router.get("/get/:id" , vote_controller.get);

//Retrieve   vote with  post by Id
Router.get("/getvotepost/:id" , vote_controller.getvotepost );



// Retrieve a single vote with post and user id
Router.get("/getvotepostuser/:id" , vote_controller.getvotepostuser);


// update a vote with speciefic id
Router.put("/update/:id" , vote_controller.update);


// delete a vote with speciefic id
Router.delete("/delete/:id" , vote_controller.delete);




module.exports = Router;