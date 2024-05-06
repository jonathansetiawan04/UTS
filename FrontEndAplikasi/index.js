const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const port = 3000;

app.set("view engine", "ejs");

//static
app.use(express.static("public"));

//layouts
app.use(expressLayouts);

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