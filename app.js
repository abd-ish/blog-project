const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(
  "mongodb+srv://abd-ish:Abhinav123@cluster0.qrjbw6w.mongodb.net/?retryWrites=true&w=majority/todolistDB",
  {
    useNewUrlParser: true,
  }
);

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Blog = mongoose.model("Blog", blogSchema);

const defaultBlog = new Blog({
  title: "Day 1",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut scelerisque elit. Sed congue interdum nunc vitae lobortis. Nunc consequat vel lorem nec hendrerit. Curabitur vitae eleifend enim. Proin nisl urna, suscipit eget tortor at, condimentum tincidunt nulla. Morbi mi velit, convallis nec iaculis non, pharetra eget erat. Phasellus volutpat magna non elementum interdum. Nullam semper tempus rhoncus. Nulla et magna id odio dapibus commodo in sed nisi. Sed vel sodales magna, et sollicitudin eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent sit amet ex sodales, cursus nisi consectetur, dictum magna. Donec non erat tincidunt, lobortis velit et, bibendum lectus. Curabitur eget auctor nisi. Praesent sed consequat sem. Quisque tempus lacinia vulputate. Nulla quis bibendum massa. Ut euismod ac metus et vulputate. Pellentesque commodo risus at feugiat scelerisque. Sed et sapien diam. In sed tristique libero, at tincidunt lorem. Proin orci turpis, maximus quis sagittis sed, pharetra eu elit. Donec nulla sem, porttitor vel quam non, consectetur rutrum quam. Sed ornare augue a tempus dictum. Vestibulum pulvinar aliquam nisl, nec cursus turpis venenatis eu. Sed pulvinar leo non velit posuere tincidunt. Nunc nec purus nisi. Nunc finibus odio ac rutrum rhoncus. Duis faucibus lorem sed turpis tempor fringilla.",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  Blog.find({}, function (err, dataPoints) {
    if (!err && dataPoints.length == 0) defaultBlog.save(function (err) {});

    res.render("home", { blog: dataPoints });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/", function (req, res) {
  const currBlog = new Blog({
    body: req.body.content,
    title: req.body.title,
  });

  currBlog.save(function (err) {});
  res.redirect("/");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen("3000", function (req, res) {
  console.log("Server started at port 3000");
});
