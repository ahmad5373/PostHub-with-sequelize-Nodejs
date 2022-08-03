const express = require("express");
const user = require("../models/user");
const profile = require("../models/profile");
const education = require("../models/education");
const experience = require("../models/experience");
const post = require("../models/post");
const vote = require("../models/vote");
const comment = require("../models/comment");
const sendMail =require('../controller/gmail_controller');
const multer = require("multer");
const upload = multer({dest:'upload/'});

const sequelize = require("sequelize");
const Op = sequelize.Op;

//Create A New User with routes and save in database
exports.createuser = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(302).send({
        message: "content cannot be epmty!",
      });
      console.log("req.body", req.body);

      return;
    }
    //Create new User
    const use = {
      Name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address:JSON.stringify(req.body.address), 
    };

    //Check if email/phone no is already exist then throw error
    const checkEmail = req.body.email;
    const checkPhone = req.body.phone;
    const found = await user.findOne({
      where: {
        [Op.or]: [{ email: checkEmail }, { phone: checkPhone }],
      },
    });
    console.log("check", checkEmail, checkPhone);

    // if found show error  email/phone  exist already
    if (found) {
      res.status(404).send({
        message:"your  email/phone no  is already in system"
      });
      console.log("found", found);
    } else {
      //Save User data in database

  
      const dt = await user.create(use);
      return res.send({ data: dt });
    }
  } catch (error) {
    console.log("could not create user", error);
    res.status(500).send({
      message: error.message || "some error occure while creating user",
    });
  }
};

//Upload single file
exports.upload =  (upload.single('profile'), (req, res)=>{
  try{
  
    const fileStorageEngine = multer.diskStorage({
      destination: (req,file,cb)=> {
      cb(null, './uploads')   
      },
      filename: (req,file,cb)=>{
      cb(null, Date.now() + '--' + file.originalname);
      },
  });
 
  console.log("fileStorageEngine",fileStorageEngine);
  console.log("req.file",req.file);
  res.send('Single File Upload Success!');

  } catch (error) {
    console.error(error.message);
    res.send({
      status: false,
      payload: "Something went wrong in while Sendingmail.",
    });
  }
});



//Get all User
exports.getuser = async (req, res, next) => {
  try {
    const data = await user.findAll({
      
    });
res.send({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(302).send({
      message: "could not get user",
    });
  }
};

//Get all User with Even id Number using Function
exports.getuserevenid = async (req, res, next) => {
  try {
    const data = await user.findAll({
      
    });

    
    
    const Even = data.filter(user => user.user_id % 2===0);
    console.log('Even',Even);
    return res.json(Even);

   
  } catch (error) {
    console.log("error", error);
    return res.status(302).send({
      message: "could not get user",
    });
  }
};
//Get all User with od id Having same Number using Map Function
exports.getuseroddid = async (req, res, next) => {
  try {
    const data = await user.findAll({
      
    });

    const same = data.map(user => user.user_id %2 !== 0);
console.log('ODD',same);
return res.json(same);



// res.send({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(302).send({
      message: "could not get user",
    });
  }
};

//Get all User with profile
exports.getuserprofile = async (req, res, next) => {
  try {
    const data = await user.findAll({
      include: [
        {
          model: profile,
        },
      ],
    });
    res.send({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(302).send({
      message: "could not get user",
    });
  }
};

//Get all User with Profile and Education
exports.getuserprofileeducation = async (req, res, next) => {
  try {
    const data = await user.findAll({
      include: [
        {
          model: profile,

          include: [
            {
              model: education,
            },
          ],
        },
      ],
    });
    res.send({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(302).send({
      message: "could not get user",
    });
  }
};

//Get all User with Profile
exports.getuserprofileexperience = async (req, res, next) => {
  try {
    const data = await user.findAll({
      include: [
        {
          model: profile,
          include: [
            {
              model: experience,
            },
          ],
        },
      ],
    });
    res.send({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(302).send({
      message: "could not get user",
    });
  }
};
//Get all User with Profile
exports.getexperiencegtyear = async (req, res, next) => {
  try {
    const data = await user.findAll({
      include: [
        {
          model: profile,
          include: [
            {
              model: experience,
              
            },
          ],
        },
      ],
    });
    res.send({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(302).send({
      message: "could not get user",
    });
  }
};

//Get all User with Post
exports.getuserpost = async (req, res, next) => {
  try {
    const data = await user.findAll({
      include: [
        {
          model: post,
        },
      ],
    });
    res.send({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(302).send({
      message: "could not get user",
    });
  }
};

//Get all User with Post and Vote
exports.getuserpostvote = async (req, res, next) => {
  try {
    const data = await user.findAll({
      include: [
        {
          model: post,

          include: [
            {
              model: vote,
            },
          ],
        },
      ],
    });
    res.send({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(302).send({
      message: "could not get user",
    });
  }
};

//Get all User with Post  Vote and Comment
exports.getuserpostvotecomment = async (req, res, next) => {
  try {
    const data = await user.findAll({
      include: [
        {
          model: post,

          include: [
            {
              model: vote,
            },
          ],
          include: [
            {
              model: comment,
            },
          ],
        },
      ],
    });
    res.send({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(302).send({
      message: "could not get user",
    });
  }
};

//Get User by specific id
exports.get = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const data = await user.findOne({
      where: { user_id: user_id, deletedAt: null },
    });
    console.log("id", user_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find user with id=${user_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

//Get User Profile by specific id
exports.getprofile = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const data = await user.findOne({
      include: [
        {
          model: profile,
        },
      ],

      where: { user_id: user_id, deletedAt: null },
    });
    console.log("id", user_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find user with id=${user_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};
//Get User Post by specific id
exports.getpost = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const data = await user.findOne({
      include: [
        {
          model: post,
        },
      ],
      where: { user_id: user_id, deletedAt: null },
    });
    console.log("id", user_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find user with id=${user_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

//Get User Profile Education by specific id
exports.getprofileeducation = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const data = await user.findOne({
      include: [
        {
          model: profile,

          include: [
            {
              model: education,
            },
          ],
        },
      ],

      where: { user_id: user_id, deletedAt: null },
    });
    console.log("id", user_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find user with id=${user_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};
//Get User Post Vote by specific id
exports.getpostvote = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const data = await user.findOne({
      include: [
        {
          model: post,

          include: [
            {
              model: vote,
            },
          ],
        },
      ],

      where: { user_id: user_id, deletedAt: null },
    });
    console.log("id", user_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find user with id=${user_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

//Get User Profile Experience by specific id
exports.getprofileexperience = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const data = await user.findOne({
      include: [
        {
          model: profile,

          include: [
            {
              model: experience,
            },
          ],
        },
      ],

      where: { user_id: user_id, deletedAt: null },
    });
    console.log("id", user_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find user with id=${user_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

//Get User Post Vote and Comment by specific id
exports.getpostvotecomment = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const data = await user.findOne({
      include: [
        {
          model: post,

          include: [
            {
              model: vote,
            },
          ],
          include: [
            {
              model: comment,
            },
          ],
        },
      ],

      where: { user_id: user_id, deletedAt: null },
    });
    console.log("id", user_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find user with id=${user_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

//Update User by id
exports.update = async (req, res, next) => {
  try {
    const user_id = req.params.id; 
    const data = await user.update(req.body ,  {
      where: {
        user_id: user_id,
      },
    });
    console.log('req.body',req.body)
    if (data !== null) {
      res.status(200).json({
        message: `user has been updated with id =${user_id}.`,
        Data: data,
      });
    } else {
      res.status(302).json({
        message:  `Cannot update user with id=${user_id}. Maybe user was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(505).json({
      error: error.message,
    });
  }
};

//Delete User by id
exports.delete = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    console.log(req.body);
    const data = await user.destroy({
      where: {
        user_id: user_id,
      },
    });
    if (data !== null) {
      res.status(200).json({
        message: `user has been deleted with id =${user_id}.`,
      });
    } else {
      res.status(400).json({
        message: `user connot be deleted with id=${user_id}.`,
      });
    }
  } catch (error) {
    res.status(505).json({
      error: error.message,
    });
  }
};
