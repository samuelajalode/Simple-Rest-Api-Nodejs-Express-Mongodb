import { Schema, model } from 'mongoose'

export interface Todo {
    content: string,
    done: boolean
}

const TodosSchema = new Schema<Todo>({
    content: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    }
})

const Todos = model<Todo>('Todos', TodosSchema)

export default { Todos }