const express = require('express');
const Router = express.Router();




//Import Post Controller Here
const post_controller = require('../controller/post_controller');

//End point for create a new post 
Router.post("/createpost" ,post_controller.createpost);

//Retreive all Post
Router.get("/getpost" , post_controller.getpost);

// Retrieve a single Post with speciefic id
Router.get("/get/:id" , post_controller.get);

// update a post with speciefic id
Router.put("/update/:id" , post_controller.update);

//Delete a post with speciefic id
Router.delete("/delete/:id" ,post_controller.delete);

module.exports = Router;