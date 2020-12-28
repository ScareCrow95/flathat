import 'dotenv/config'
import App from './app'
import AccountController from './controllers/login/accountController'
import { validateEnv } from './utils/validateEnv'

validateEnv()

const PORT = 3000

const app = new App([new AccountController()])

app.listen(PORT)
