/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const {createUser, getUserByUsername } = require('../db/users')


router.use((req, res, next)=>{
    console.log('A request is being made to /users')
    next()
})
// POST /api/users/register
router.post('/register', async (res, req, next)=>{
    const {username, password} = res.body

    if(password.length < 8){
        next({
            name: 'PasswordShortError',
            message: 'A password must be at least 8 characters long'

        })
    }



    // createUser()

})



// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;