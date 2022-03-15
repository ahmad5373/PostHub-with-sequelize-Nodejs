const express = require("express");
const profile = require("../models/profile");
const education = require("../models/education");
const experience = require("../models/experience");

//create A new Profile and save in database
exports.createprofile = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(302).send({
        message: "content can not be empty!",
      });
      return;
    }
    //Create a new Profile
    const prof = {
      title: req.body.title,
      about: req.body.about,
      user_id: req.body.user_id,
    };

    const checkuserid = req.body.user_id;
    const found = await profile.findOne({
      where: {
        user_id: checkuserid,
      },
    });
    console.log("check", checkuserid);

    // if found show error exist already
    if (found) {
      res.send("this user have  already have profile in system");
      // res.send("your  phone no is already in system");
      console.log("found", found);
    } else {
      // Save Profile in database
      const dt = await profile.create(prof);
      return res.send({ data: dt });
    }
  } catch (error) {
    console.log("error!", error);
    res.status(500).send({
      message: error.message || "some Error occure while creating profile",
    });
  }
};

// Retrieve All Profile
exports.getprofile = async (req, res, next) => {
  try {
    const data = await profile.findAll({});
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(302).send({
      message: "could not get profile",
    });
  }
};

// Retrieve All Profile Education
exports.getprofileeducation = async (req, res, next) => {
  try {
    const data = await profile.findAll({
      include: [
        {
          model: education,
        },
      ],
    });
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(302).send({
      message: "could not get profile",
    });
  }
};

// Retrieve All Profile Experience
exports.getprofileeexperience = async (req, res, next) => {
  try {
    const data = await profile.findAll({
      include: [
        {
          model: experience,
        },
      ],
    });
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(302).send({
      message: "could not get profile",
    });
  }
};

//Get Profile By Id
exports.get = async (req, res, next) => {
  try {
    const profile_id = req.params.id;
    const data = await profile.findOne({
      where: { profile_id: profile_id, deletedAt: null },
    });
    console.log("id", profile_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find profile with id=${profile_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

//Get Profile Education By Id
exports.getprofeducation = async (req, res, next) => {
  try {
    const profile_id = req.params.id;
    const data = await profile.findOne({
      include: [
        {
          model: education,
        },
      ],
      where: { profile_id: profile_id, deletedAt: null },
    });
    console.log("id", profile_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find profile with id=${profile_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

//Get Profile Experience By Id
exports.getprofexperience = async (req, res, next) => {
  try {
    const profile_id = req.params.id;
    const data = await profile.findOne({
      include: [
        {
          model: experience,
        },
      ],
      where: { profile_id: profile_id, deletedAt: null },
    });
    console.log("id", profile_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find profile with id=${profile_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

//Update Profile by id
exports.update = async (req, res, next) => {
  try {
    const profile_id = req.params.id;
    console.log("req.body", req.body);
    const data = await profile.update(req.body, {
      where: { profile_id: profile_id, deletedAt: null },
    });
    if (data !== null) {
      res.status(200).json({
        message: `profile has been updated with id =${profile_id}.`,
      });
    } else {
      res.status(400).json({
        message: `profile connot be updated with id=${profile_id}.`,
      });
    }
  } catch (error) {
    res.status(505).json({
      error: error.message,
    });
  }
};

//Delete Profile
exports.delete = async (req, res, next) => {
  try {
    const profile_id = req.params.id;
    console.log(req.body);
    const data = await profile.destroy({
      where: {
        profile_id: profile_id,
      },
    });
    if (data !== null) {
      res.status(200).json({
        message: `profile has been deleted with id =${profile_id}.`,
      });
    } else {
      res.status(400).json({
        message: `profile connot be deleted with id=${profile_id}.`,
      });
    }
  } catch (error) {
    res.status(505).json({
      error: error.message,
    });
  }
};
