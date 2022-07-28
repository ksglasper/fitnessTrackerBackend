/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser, getUserByUsername } = require("../db/users");
const jwt = require("jsonwebtoken");







router.use((req, res, next) => {
    console.log("A request is being made to /users");
  next();
});
// POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (password.length < 8) {
    next({
      name: "PasswordShortError",
      message: "A password must be at least 8 characters long",
    });
  }

  if (await getUserByUsername(username)) {
    next({
      name: "UserExistError",
      message: "A user already exists!",
    });
  }

  const response = await createUser({ username, password });
  
    const token = jwt.sign({
        id : response.id
        username,
        expiresIn : "1m"
    })



  res.send({
    message: "Thank you for signing up",
    token,
    user: response,
  });
  // createUser()
});

// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
