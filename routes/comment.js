const express = require ('express');
const Router = express.Router();


//Import comment controller here
const comment_controller = require('../controller/comment_controller');

//Create  New Comment 
Router.post("/createcomment" ,comment_controller.createcomment);

//Getting All comment
Router.get("/getcomment" , comment_controller.getcomment);

//Get comment with id
Router.get("/get/:id" , comment_controller.get);

//Update comment 
Router.put("/update/:id" , comment_controller.update);

//Delete Comment 
Router.delete("/delete/:id" , comment_controller.delete);


module.exports = Router;