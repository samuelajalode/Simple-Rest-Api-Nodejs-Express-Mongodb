import express from 'express'
import controller from '../controllers/todos'

const router = express.Router()

router.get('/posts', controller.getTodos)
router.get('/posts/:id', controller.getTodo)
router.patch('/posts/:id', controller.updateTodo)
router.delete('/posts/:id', controller.deleteTodo)
router.post('/posts', controller.createTodo)

export = router