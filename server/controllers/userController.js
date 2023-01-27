'use strict';

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error('Please add all required fields!');
    }

    const userExists = await User.find({ 'username': { $regex: new RegExp(username, 'i') } });

    if (userExists.length !== 0) {
        res.status(400);
        throw new Error('Username is already in use!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        password: hashedPwd
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data!');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Incorrect username or password!');
    }
});

const getMe = asyncHandler(async (req, res) => {
    const { _id, username, vote } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        username,
        vote
    })
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}