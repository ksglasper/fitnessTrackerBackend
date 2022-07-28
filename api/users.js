/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const {createUser, getUserByUsername } = require('../db/users')


router.use((req, res, next)=>{
    console.log('A request is being made to /users')
    next()
})
// POST /api/users/register
router.post('/register', async (req, res, next)=>{
    const {username, password} = req.body

    if(password.length < 8){
        next({
            name: 'PasswordShortError',
            message: 'A password must be at least 8 characters long'

        })
    }

    if(getUserByUsername(username)){
        next({
            name: 'UserExistError',
            message: 'A user already'
        })
    }



    // createUser()

})



// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;