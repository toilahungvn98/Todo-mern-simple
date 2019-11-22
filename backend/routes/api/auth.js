const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretKey = config.get('secretOrKey');
//validation

const validateLogin = require('../../validation/login');


//Models
const User = require('../../models/User');

//API

//@route POST /auth
//@desc Auth user
//@access Public

router.post('/', async (req, res) => {
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
    try {
    
        const user = await User.findOne({
            email: email
        });
        
        if (!user) {
            return res.status(400).json({
                msg: 'User does not exists'
            });
        } else {
        
            //return infor user ,not password
            const isMatch = bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({ msg : 'Email or password Invalid'})
            }
              // Sign token
            jwt.sign(
                { id : user.id },
                secretKey, {
                    expiresIn: '12h' 
                },
                (err, token) => {
                    res.json({
                        token,
                        user : {
                            id : user.id,
                            name : user.name,
                            email : user.email
                        }
                    });
                }
            );
        }
    } catch (error) {
        return res.status(400).json({
            msg: 'Login failed!'
        });
    }



});


module.exports = router;