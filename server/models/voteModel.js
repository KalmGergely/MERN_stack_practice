'use strict';

const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    voter_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    vote_value: Number
});

module.exports = mongoose.model('Vote', voteSchema);