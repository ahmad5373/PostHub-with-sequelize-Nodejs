const express = require('express');
const Router = express.Router();

//Import Comment_vote_controller Here
const Comment_vote_controller = require('../controller/comment_vote_controller');

//Create A new Comment vote 
Router.post("/createcommentvote" , Comment_vote_controller.createcommentvote);

//Get All comment_Vote
Router.get("/getcomment_vot",Comment_vote_controller.getcomment_vot);

//Get signle comment_Vote
Router.get("/get/:id",Comment_vote_controller.get);

//Updated comment_vote
Router.put("/update/:id" , Comment_vote_controller.update);

//Delete Comment_Vote
Router.delete("/delete/:id" , Comment_vote_controller.delete);


module.exports = Router;