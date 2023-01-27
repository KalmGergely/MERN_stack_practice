'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    vote: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);