import mongoose from 'mongoose'
import Controller from './controllers/controller.interface'
import AuthorizationMiddleware from './middleware/authorization.middleware'
import errorMiddleware from './middleware/error.middleware'
import bodyParser = require('body-parser')
import express = require('express')

class App {
    public app: express.Application

    constructor(controllers: Controller[]) {
        this.app = express()
        this.connectToTheDatabase()
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
        this.initializeErrorHandling()
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`server start on ${port}`)
        })
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json())
        this.app.use('/api', AuthorizationMiddleware)
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router)
        })
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }

    private connectToTheDatabase() {
        const { MONGO } = process.env
        mongoose.set('useCreateIndex', true)
        mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    }
}

export default App
