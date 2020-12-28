import { cleanEnv, str } from 'envalid'

export const validateEnv = () => {
    cleanEnv(process.env, {
        MONGO: str(),
        JWT: str(),
    })
}
