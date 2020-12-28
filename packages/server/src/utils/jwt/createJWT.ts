import * as jwt from 'jsonwebtoken'

export interface UserToken {
    _id: string
}

export const createToken = (_id: string): string => {
    const expiresIn = 60 * 60 * 24
    const { JWT } = process.env
    const userToken: UserToken = {
        _id,
    }
    return jwt.sign(userToken, JWT, { expiresIn })
}
