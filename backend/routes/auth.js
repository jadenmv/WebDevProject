const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        //checking if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        //create and save the new user
        const newUser = new User({
            username,
            email,
            passwordHash,
        });
        const savedUser = await newUser.save();
        res.status(201).json({message: 'User saved successfully', userId: savedUser.id});
    }catch(err) {
        console.error("REGISTRATION ERROR: ", err);
        res.status(500).json({message: 'Server Error during registration'});
    }

});
router.post('/login', async (req, res) => {
    try{
        const{email, password} = req.body;

        //finding the user
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        if(!user.passwordHash){
            return res.status(400).json({message: 'Invalid password'});
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    }catch(err) {
        console.error("LOGIN ERROR: ", err);
        res.status(500).json({message: 'Server Error during login'});
    }
});

module.exports = router;