const express = require('express')
const app = express();
const connection=require('./database/connection');
const user= require('./routes/user');
const profile = require('./routes/profile');
const education = require('./routes/education');
const experience = require('./routes/experience');
const post = require('./routes/post');
const vote =require('./routes/vote');
const comment = require('./routes/comment');
const comment_vote = require('./routes/comment_vote');
var bodyParser = require('body-parser');

const PORT = process.env.PORT ||1500;

app.get("/" , (req,res) =>{
    res.send('This is testing app')
});



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// app.use(express.json()) use as a middleware
app.use(express.json());


// using express middleware in this main file
app.use("/user" , user);
app.use("/profile" , profile);
app.use("/education" ,education);
app.use("/experience" , experience);
app.use("/post" , post);
app.use("/vote" , vote);
app.use("/comment" , comment);
app.use("/comment_vote" , comment_vote);

app.listen(PORT,() =>{
    console.log(`app is listining on : http://localhost:${PORT}`)
});