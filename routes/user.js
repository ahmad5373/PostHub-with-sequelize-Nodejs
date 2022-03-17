const express =require('express');
const Router = express.Router();

const user_controller = require('../controller/user_controller');

//Create New User 
Router.post("/createuser" ,user_controller.createuser);

//Send mail to User 
Router.post("/createmail" ,user_controller.createmail);

//get all User
Router.get("/getuser" , user_controller.getuser);

//Get all User with Even id Number using filter Function
Router.get("/getuserevenid" , user_controller.getuserevenid);

//Get all User with od id Having same Number using Map Function
Router.get("/getuseroddid" , user_controller.getuseroddid);

//get all User with profile
Router.get("/getuserprofile" , user_controller.getuserprofile);

//get all User with profile Education
Router.get("/getuserprofileeducation" , user_controller.getuserprofileeducation);

//get all User with profile Experience
Router.get("/getuserprofileexperience" , user_controller.getuserprofileexperience);

//get all User with profile Experience Whose experience greater than  one year
Router.get("/getexperiencegtyear" , user_controller.getexperiencegtyear);

//Get all User With Post
Router.get("/getuserpost" , user_controller.getuserpost);

//Get all User With Post and Vote
Router.get("/getuserpostvote" , user_controller.getuserpostvote);

//Get all User With Post Vote and comment
Router.get("/getuserpostvotecomment" , user_controller.getuserpostvotecomment);

//get User with  id
Router.get("/get/:id",user_controller.get);

//get User Profile with  id
Router.get("/getprofile/:id",user_controller.getprofile);

//get User Post with  id
Router.get("/getpost/:id",user_controller.getpost);

//get User Profile Education with  id
Router.get("/getprofileeducation/:id",user_controller.getprofileeducation);

//get User Post Vote with  id
Router.get("/getpostvote/:id",user_controller.getpostvote);

//get User Post Vote and Comment with  id
Router.get("/getpostvotecomment/:id",user_controller.getpostvotecomment);

//get User Profile Experience with  id
Router.get("/getprofileexperience/:id",user_controller.getprofileexperience);

//update User with id
Router.put("/update/:id" , user_controller.update);

//delete User with id
Router.delete("/delete/:id" , user_controller.delete);

module.exports = Router;