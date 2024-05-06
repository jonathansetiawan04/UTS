const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const port = 3000;

//static
app.use(express.static("public"));

//passport config
require("./config/passport")(passport);

//db config
const db = require("./config/keys").MongoURI;

//connect mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoDB Terkoneksi..."))
  .catch((err) => console.log(err));

// ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

//bodyparser
app.use(express.urlencoded({ extended: false }));

// express session middleware
app.use(
  session({
    secret: "rahasia",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

// global var
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(port, () => {
    console.log(`Webserver app listening on port ${port}`);
})


app.get("/", (req,res) => {
    res.render("index.ejs",{title : "homepage",layout:'mainlayout.ejs'})
})


app.get("/404", (req,res) => {
    res.render("404.ejs",{title : "404",layout:'mainlayout.ejs'})
})


app.get("/about", (req,res) => {
    res.render("about.ejs",{title : "about us",layout:'mainlayout.ejs'})
})


app.get("/contact", (req,res) => {
    res.render("contact.ejs",{title : "contact us",layout:'mainlayout.ejs'})
})


app.get("/courses", (req,res) => {
    res.render("courses.ejs",{title : "courses",layout:'mainlayout.ejs'})
})


app.get("/team", (req,res) => {
    res.render("team.ejs",{title : "our teams",layout:'mainlayout.ejs'})
})


app.get("/testimonial", (req,res) => {
    res.render("testimonial.ejs",{title : "testimonials",layout:'mainlayout.ejs'})
})


app.get("/login", (req, res) => {
    res.render("login.ejs", { title: "Login",layout:'layout.ejs' });
});


app.get("/forget", (req, res) => {
    res.render("forget.ejs", { title: "forget password",layout:'layout.ejs' });
});

app.get("/register", (req, res) => {
    res.render("register.ejs", { title: "register",layout:'layout.ejs' });
});