const Post = require('../models/postModels')

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAll()
        res.status(200).json(posts)
    }
    catch (error) {
        res.status(500).json({error: 'Error retrieving posts'})
    }
}

exports.getPostByID = async (req, res) => {
    try{
        const post = await Post.getById(req.params.postId)
        if (!post) {
            return res.status(404).json({error: 'Post not found'})
        }
        res.status(200).json(post)
    }
    catch (error) {
        res.status(500).json({error: 'Error retrieving post'})
    }
}

exports.createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body)
        res.status(200).json(newPost)
    }
    catch (error) {
        res.status(500).json({error: 'Error creating post'})
    }
}

exports.updatePost = async (req, res) => {
    try{
        const updatePost = await Post.update(req.params.postId, req.body)
        if (!updatePost){
            return res.status(404).json({error: 'Post not found'})
        }
        res.status(200).json(updatePost)
    }
    catch (error) {
        res.status(500).json({error: 'Error updating post'})
    }
}

exports.deletePost = async (req, res) => {
    try{
        const deleted = await Post.delete(req.params.postId)
        if (!deleted){
            return res.status(404).json({error: 'Post not found'})
        }
        res.status(204).send()
    }
    catch (error) {
        res.status(500).json({error: 'Error deleting post'})
    }
}
