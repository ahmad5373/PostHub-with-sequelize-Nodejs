const express = require ('express');
const Router = express.Router();


//Import Experience controller here
const experience_controller = require('../controller/experience_controller');


//End point for create a new Experience
Router.post("/createexperience" ,experience_controller.createexperience);

//Get all Experience
Router.get("/getexperience", experience_controller.getexperience);


// Get a experience with speciefic id
Router.get("/get/:id" , experience_controller.get);

// update a experience with speciefic id
Router.put("/update/:id" ,experience_controller.update);

//delete specific experience with id
Router.delete("/delete/:id" ,experience_controller.delete);

module.exports = Router;