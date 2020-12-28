import { handleRequest } from './../handleRequest'
import { checkAccount, CheckAccountDto } from './components/checkAccount'
import { AccountDto, createAccount } from './components/createAccount'
import { login, LoginDto } from './components/login'
import { Request, Response, Router } from 'express'
import Controller from '../controller.interface'
import { validationMiddleware } from './../../middleware/validation.middleware'

class AccountController implements Controller {
    public path = '/account'
    public router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(LoginDto),
            (req, res) => handleRequest(req, res, login),
        )
        this.router.post(
            `${this.path}/check`,
            validationMiddleware(CheckAccountDto),
            (req, res) => handleRequest(req, res, checkAccount),
        )
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(AccountDto),
            (req, res) => handleRequest(req, res, createAccount),
        )
    }
}

export default AccountController
