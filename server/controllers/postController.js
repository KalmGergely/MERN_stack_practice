'use strict';

const Post = require('../models/postModel');
const User = require('../models/userModel');
const Vote = require('../models/voteModel');
const asyncHandler = require('express-async-handler');

const getPosts = asyncHandler(async (req, res) => {
    let sort;

    if (req.query.sort === 'new') {
        sort = { timeStamp: -1 };
    } else if (req.query.sort === 'top') {
        sort = { score: -1 };
    }

    const posts = await Post.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'owner_id',
                foreignField: '_id',
                as: 'owner'
            }
        },
        {
            $set: {
                owner: { $arrayElemAt: ['$owner', 0] }
            }
        },
        {
            $project: {
                'title': 1,
                'url': 1,
                'timeStamp': 1,
                'score': 1,
                'owner.username': 1
            }
        }
    ])
        .sort(sort);

    res.status(200).json(posts);
});

const createPost = asyncHandler(async (req, res) => {
    if (!req.body.title || req.body.title.replace(/\s/g, '') === '') {
        res.status(400);
        throw new Error('Please add a title!');
    }
    if (!req.body.url || req.body.url.replace(/\s/g, '') === '') {
        res.status(400);
        throw new Error('Please add a link!');
    }

    const { title, url } = req.body;

    const newPost = await Post.create({
        title,
        url,
        timeStamp: Date.now(),
        owner_id: req.user.id
    });

    res.status(201).json(newPost);
});

const updatePost = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const postToUpdate = await Post.findById(req.params.id);
    const { title, url } = req.body;

    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }

    if (!postToUpdate) {
        res.status(400);
        throw new Error('Post not found!');
    }

    if (postToUpdate.owner_id.toString() !== user.id) {
        res.status(401);
        throw new Error('Unauthorized user!');
    }

    if (!req.body.title || req.body.title.replace(/\s/g, '') === '') {
        res.status(400);
        throw new Error('Please add a title!');
    }
    if (!req.body.url || req.body.url.replace(/\s/g, '') === '') {
        res.status(400);
        throw new Error('Please add a link!');
    }

    await Post.findByIdAndUpdate(req.params.id, {
        title,
        url,
        timeStamp: Date.now()
    });

    res.status(200).json(await Post.findById(req.params.id));
});

const deletePost = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const postToDelete = await Post.findById(req.params.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }

    if (!postToDelete) {
        res.status(400);
        throw new Error('Post not found!');
    }

    if (postToDelete.owner_id.toString() !== user.id) {
        res.status(401);
        throw new Error('Unauthorized user!');
    }

    await postToDelete.remove();

    res.status(200).json({ id: req.params.id });
});

const downvotePost = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }

    if (!post) {
        res.status(400);
        throw new Error('Post not found!');
    }

    const owner = await User.findById(post.owner_id.toString());

    const voteExists = await Vote.findOne({ voter_id: user.id, post_id: post.id });

    if (voteExists) {
        res.status(400);
        throw new Error('You already voted on this post!');
    }

    await Vote.create({
        voter_id: user.id,
        post_id: post.id,
        vote_value: -1
    });

    await Post.findByIdAndUpdate(post.id, { score: post.score - 1 });

    await User.findByIdAndUpdate(owner.id, { vote: owner.vote - 1 });

    res.status(200).json(await Post.findById(post.id));
});

const upvotePost = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found!');
    }

    if (!post) {
        res.status(400);
        throw new Error('Post not found!');
    }

    const owner = await User.findById(post.owner_id.toString());

    const voteExists = await Vote.findOne({ voter_id: user.id, post_id: post.id });

    if (voteExists) {
        res.status(400);
        throw new Error('You already voted on this post!');
    }

    await Vote.create({
        voter_id: user.id,
        post_id: post.id,
        vote_value: 1
    });

    await Post.findByIdAndUpdate(post.id, { score: post.score + 1 });

    await User.findByIdAndUpdate(owner.id, { vote: owner.vote + 1 });

    res.status(200).json(await Post.findById(post.id));
});

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    downvotePost,
    upvotePost
};