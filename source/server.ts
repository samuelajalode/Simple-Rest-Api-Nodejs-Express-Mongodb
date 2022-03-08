import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan'
import routes from './routes/todos'
import { connect, connection } from 'mongoose'
import todos from './controllers/todos'

const router: Express = express()

// For Logging
router.use(morgan('dev'))

// Parse the request.
router.use(express.urlencoded({ extended: false }))

// Takes care of JSON data
router.use(express.json())

// Rules of our API
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*')
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization')
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST')
        return res.status(200).json({})
    }
    next()
})

// Routes
router.use('/', routes)

// Error handling
router.use((req, res, next) => {
    const error = new Error('Not Found')
    return res.status(404).json({
        message: error.message
    })
})

const username = 'kingzoo_254'
const password = 'hfXziCCb2pL2'
const cluster = 'cluster0.t6p81'
const dbname = 'todos'

// Connect to a local instance of mongodb
connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`)

const db = connection
db.on('error', console.error.bind(console, "Connection error: "))
db.once('open', () => console.log('Connected successfully'))

// Initiating the Server
const httpServer = http.createServer(router)
const PORT: number | string = process.env.PORT ?? 6061
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`))