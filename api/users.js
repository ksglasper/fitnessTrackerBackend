/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser, getUserByUsername, getUser } = require("../db/users");
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});
// POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (password.length < 8) {
      next({
        name: "PasswordShortError",
        message: `Password Too Short!`,
        error: 'Error!'
        
      });
    }

    if (await getUserByUsername(username)) {
      next({
        name: "UserExistError",
        message: `User ${username} is already taken.`,
        error: 'Error!'
      });
    }

    const response = await createUser({ username, password });

    const token = jwt.sign({
      id: response.id,
      username
    },process.env.JWT_SECRET, {expiresIn: "1m"});
    // console.log(token, "!!!!!!!!!!!!!");

    res.send({
      message: "Thank you for signing up",
      token,
      user: response,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login

router.post('/login', async (req, res, next)=>{
    const {password, username} = req.body
    try {
        const user = await getUser({username, password})
      if(!user){
        next({
            
        })
      }  
    } catch (error) {
        next(error)
    }
})

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
