const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../configs/keys');

//validation

const validateRegister = require('../../validation/register');
const validateLogin = require('../../validation/login');

//Models
const User = require('../../models/User');

//API

//@route POST users/register
//@desc Register user
//@access Public

router.post('/register', async (req, res) => {
    // Form validation
    const {
        errors,
        isValid
    } = validateRegister(req.body);
    //Check 
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {

        const fetch = await User.findOne({
            email: req.body.email
        });
        if (fetch) {
            return res.status(400).json({
                msg: 'Email already exists'
            });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            //hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user));
                })
            });
        }
    } catch (error) {
        return res.status(400).json({
            msg: 'Register failed!'
        });
    }



});

//@route POST users/login
//@desc Login user  and return JWT token
//@access Public
router.post("/login", async (req, res) => {
    // Form validation
    const {
        errors,
        isValid
    } = validateLogin(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    try {
        const user = await User.findOne({
            email
        });

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                msg: "Email not found"
            });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                name: user.name
            };
            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey, {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
        } else {
            return res
                .status(400)
                .json({
                    msg: "Password incorrect"
                });
        }


    } catch (error) {
        console.log(error);
    }
});

module.exports = router;