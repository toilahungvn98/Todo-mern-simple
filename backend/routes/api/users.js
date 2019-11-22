const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretKey = config.get('secretOrKey');

//validation

const validateRegister = require('../../validation/register');

//Models
const User = require('../../models/User');

//middleware 
const authMiddleware = require('../../middleware/auth');

//API

//@route GET users/
//@desc info user private
//@access Private
router.get('/',authMiddleware, async (req, res) => {
    const infoUser =  await User.findById(req.user.id).select('-password');
    if(infoUser) {
        return res.json(infoUser);
    }
})


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
        //fetch all email user in db, if exists return msg,
        //else create new user ( hash, sign jwt)
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
                        .then(user => {
                            jwt.sign(
                                { id : user.id},
                                secretKey,
                                { expiresIn : '12h' },
                                (err, token) => {
                                    if (err) throw err;
                                    return res.json({
                                        token,
                                        user : {
                                            id : user.id,
                                            name : user.name,
                                            email : user.email
                                        }
                                    })
                                }
                            )
                        });
                })
            });
        }
    } catch (error) {
        return res.status(400).json({
            msg: 'Register failed!'
        });
    }



});


module.exports = router;