import { Request, Response, NextFunction } from 'express'
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

const getTodoById = async (id: string) => models.Todos.findById(id)


// getting all posts
const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    const result: TodosResponse[] = await models.Todos.find({})
    return res.status(200).json({
        response: result
    })
}

const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    // Get the id from the request body.
    const id: string = req.params.id
    const todo = await getTodoById(id)

    if (!todo) {
        return res.status(404).json({
            response: 'Todo Not Found'
        })
    }

    try {
        const result: TodosResponse = todo
        return res.status(200).json({
            response: result
        })
    } catch (error) {
        return res.status(500).json({
            response: `An error occurred: ${error}`
        })
    }
}


const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    // Get the data from the request body.
    const id: string = req.params.id
    const todo = await getTodoById(id)

    if (!todo) {
        return res.status(404).json({
            response: 'Todo Not Found'
        })
    }

    try {
        // Update the todo then save it to the database.
        Object.assign(todo, req.body)
        await todo.save()
        const result: TodosResponse = todo
        return res.status(200).json({
            response: result
        })
    } catch (error) {
        return res.status(500).json({
            response: `An error occurred: ${error}`
        })
    }
}

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    // Get the data from the request body.
    const id: string = req.params.id
    const todo = await getTodoById(id)

    if (!todo) {
        return res.status(404).json({
            response: 'Todo Not Found'
        })
    }

    try {
        // Remove the todo from the database.
        await todo.remove()
        return res.status(204).json({
            response: 'Deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({
            response: `An error occurred: ${error}`
        })
    }
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
