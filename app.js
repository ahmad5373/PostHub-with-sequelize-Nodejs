const express = require("express");
const app = express();
const student = require("./routes/student");
const dbConfig = require("./database/config");
const teacher = require("./routes/teacher");
const PORT = process.env.PORT || 8000;


// app.use(express.json()) use as a middleware
app.use (express.json());


// using express middleware in this main file
app.use("/student", student);
app.use("/teacher", teacher);

app.listen(PORT, () => {
  console.log(`listening on: http://localhost:${PORT}`);
});
