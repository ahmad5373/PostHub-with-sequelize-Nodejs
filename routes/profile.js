const express = require("express");
const Router = express.Router();

//import Profile controller Here
const profile_controller = require("../controller/profile_controller");

//End point for create a new Profile
Router.post("/createprofile", profile_controller.createprofile);

// Get all Profile
Router.get("/getprofile", profile_controller.getprofile);

// Get all Profile Education
Router.get("/getprofileeducation", profile_controller.getprofileeducation);

// Get all Profile Experience
Router.get("/getprofileeexperience", profile_controller.getprofileeexperience);

//Get Profile With id
Router.get("/get/:id", profile_controller.get);

//Get Profile Education With id
Router.get("/getprofeducation/:id", profile_controller.getprofeducation);

//Get Profile Experience With id
Router.get("/getprofexperience/:id", profile_controller.getprofexperience);

//Update Profile with id
Router.put("/update/:id", profile_controller.update);

//Delete Profile
Router.delete("/delete/:id", profile_controller.delete);

module.exports = Router;
