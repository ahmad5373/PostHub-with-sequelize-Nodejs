const express = require('express');
const Router = express.Router();


//Import education controller Here
const education_controller = require('../controller/education_controller');


//Create New Education
Router.post("/createeducation" , education_controller.createeducation);

//Get all education
Router.get("/geteducation", education_controller.geteducation);


//Get education by specific id
Router.get("/get/:id" , education_controller.get);


//Update education by id
Router.put("/update/:id" , education_controller.update);


//Delete education by id
Router.delete("/delete/:id" , education_controller.delete);



module.exports = Router;