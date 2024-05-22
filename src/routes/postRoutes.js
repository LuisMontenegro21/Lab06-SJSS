const express = require('express')
const postController = require('../controllers/postController')
const { post } = require('../app')

const router = express.Router()


router.get('/', postController.getAllPosts)

router.get('/:postId', postController.getPostByID)

router.post('/', postController.createPost)

router.put('/:postId', postController.updatePost)

router.delete('/:postId', postController.deletePost)

module.exports = router