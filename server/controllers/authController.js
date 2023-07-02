const User = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getRes = (req, res) => {
  res.send("Hey!, This is your server response");
};

exports.signUp = (req, res) => {
  console.log(req.body);

  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassoword) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassoword,
      });

      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: "User created successfully",
            result,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        error,
      });
    });
};

exports.signIn = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Password do not match",
            });
          }

          const token = jwt.sign(
            {
              userEmail: user.email,
              userId: user._id,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          res.send({
            message: "Login is successful",
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          res.send({
            message: "Error in comparing password",
            error,
          });
        });
    })
    .catch((err) => {
      res.status(404).send({
        message: "Email not found",
        err,
      });
    });
};
