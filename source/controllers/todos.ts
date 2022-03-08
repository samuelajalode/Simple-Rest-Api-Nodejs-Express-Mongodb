import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'
import { Todo } from '../models/todos.model';
import models from '../models/todos.model'

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface TodosResponse extends Todo {
    id?: string,
}

const url = 'https://jsonplaceholder.typicode.com/'

// getting all posts
const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    const result: TodosResponse[] = await models.Todos.find({})
    return res.status(200).json({
        response: result
    })
}

const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    // Get the id from the request body.
    let id: string = req.params.id
    let result: AxiosResponse = await axios.get(`${url}posts/${id}`)
    let post: Post = result.data
    return res.status(200).json({
        response: post
    })
}

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    // Get the data from the request body.
    let id: string = req.params.id
    let title: string = req.body.title ?? null
    let body: string = req.body.body ?? null
    let result: AxiosResponse = await axios.patch(`${url}posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    })

    let post: Post = result.data
    return res.status(200).json({
        response: post
    })
}

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    // Get the id from the request body.
    let id: string = req.params.id
    let result: AxiosResponse = await axios.delete(`${url}posts/${id}`)

    return res.status(200).json({
        message: 'Post deleted successfully'
    })
}

const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const todo = new models.Todos<Todo>(req.body)

    try {
        await todo.save()
        const result: TodosResponse = todo
        return res.status(201).json({
            response: result
        })
    } catch (error) {
        return res.status(500).json({
            response: `An error occurred: ${error}`
        })
    }
}

export default { createTodo, updateTodo, deleteTodo, getTodo, getTodos }
