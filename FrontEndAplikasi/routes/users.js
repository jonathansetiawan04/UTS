const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const path = require('path');
const app = express();

// Set up static files middleware
app.use(express.static(path.join(__dirname, 'public')));

//user model
const User = require("../models/User");
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

//register post
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  // console.log(req.body);
  // res.send("hello");
  let errors = [];

  //cek required
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "harap data di input semua" });
  }

  //password
  if (password !== password2) {
    errors.push({ msg: "password tidak sama" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //validasi oke lanjut database
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //usernya ada
        errors.push({ msg: "Email sudah terdaftar" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set password jadi hash
            newUser.password = hash;

            //simpan user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "Anda berhasil registrasi, Silahkan Login"
                );

                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/in",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Assuming req.user is populated after successful login
router.get('/in', (req, res) => {
  res.render('index', { user: req.user }); // Pass user object to the template
});

//logout handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Anda berhasil Log out");
  res.redirect("/users/login");
});
module.exports = router;

router.get('/forget', (req, res) => {
  res.render('forget'); // Render forget password form
});

router.post('/forget', (req, res) => {
  const { email } = req.body;

  // Find user by email
  User.findOne({ email: email }).then(user => {
    if (!user) {
      // Unregistered email
      req.flash('error_msg', 'Email not found');
      return res.redirect('/users/forget'); // Redirect back to forget password form
    }
    // Registered email
    // Send password reset instructions (e.g., email with reset link)
    // For simplicity, let's assume we're just logging the reset instructions
    console.log('Reset instructions sent to:', email);
    req.flash('success_msg', 'Reset instructions sent to your email');
    res.redirect('/users/login');
  }).catch(err => {
    console.error(err);
    req.flash('error_msg', 'Something went wrong');
    res.redirect('/users/forget');
  });
});

module.exports = router;

