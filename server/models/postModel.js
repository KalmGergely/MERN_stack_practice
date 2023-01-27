'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    url: String,
    timeStamp: Number,
    score: {
        type: Number,
        default: 0
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Post', postSchema);