import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

const url = 'https://jsonplaceholder.typicode.com/'

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`${url}posts`)
    let posts: Post[] = result.data
    return res.status(200).json({
        response: posts
    })
}

const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // Get the id from the request body.
    let id: string = req.params.id
    let result: AxiosResponse = await axios.get(`${url}posts/${id}`)
    let post: Post = result.data
    return res.status(200).json({
        response: post
    })
}

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
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

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // Get the id from the request body.
    let id: string = req.params.id
    let result: AxiosResponse = await axios.delete(`${url}posts/${id}`)

    let post: Post = result.data
    return res.status(200).json({
        message: 'Post deleted successfully'
    })
}

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    // Get the data from the request body.
    let title: string = req.body.title ?? null
    let body: string = req.body.body ?? null
    let result: AxiosResponse = await axios.post(`${url}posts`, {
        title,
        body
    })

    let post: Post = result.data
    return res.status(201).json({
        response: post
    })
}

export default { createPost, updatePost, deletePost, getPost, getPosts }