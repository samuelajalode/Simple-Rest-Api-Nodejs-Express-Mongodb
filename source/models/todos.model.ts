const mongoose = require('mongoose')

export interface Todo {
    todoId: number,
    content: string,
    done: boolean
}

const TodosSchema: Todo = new mongoose.Schema({
    todoId: {
        type: Number,
        required: true,
        default: 1
    },
    content: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    }
})

const Todos = mongoose.model('Todos', TodosSchema)

export default { Todos }