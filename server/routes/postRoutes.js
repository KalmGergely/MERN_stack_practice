'use strict';

const express = require('express');
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost, downvotePost, upvotePost } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

router.route('/').get(getPosts).post(protect, createPost);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);
router.route('/:id/downvote').put(protect, downvotePost);
router.route('/:id/upvote').put(protect, upvotePost);

module.exports = router;