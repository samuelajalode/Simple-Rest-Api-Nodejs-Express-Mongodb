import express from 'express'
import controller from '../controllers/posts'

const router = express.Router()

router.get('/posts', controller.getPosts)
router.get('/posts/:id', controller.getPost)
router.patch('/posts/:id', controller.updatePost)
router.delete('/posts/:id', controller.deletePost)
router.post('/posts', controller.createPost)

export = router