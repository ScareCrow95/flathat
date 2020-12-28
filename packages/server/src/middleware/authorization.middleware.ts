import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { UserToken } from 'utils/jwt/createJWT'
import HttpException from './exceptions/HttpException'

function AuthorizationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    res.header('Access-Control-Allow-Headers', 'Authorization')
    try {
        if (req.get('Authorization')) {
            const token = req.get('Authorization').split(' ')[1]
            let decoded: UserToken
            try {
                const { JWT } = process.env
                decoded = jwt.verify(
                    token,
                    Buffer.from(JWT, 'base64'),
                ) as UserToken
            } catch (err) {
                next(new HttpException(400, 'wrong jwt token'))
            }
            req.body.user = decoded._id
            next()
        } else {
            next(new HttpException(400, 'unauthorized'))
        }
    } catch (err) {
        next(new HttpException(400, 'authorization error'))
    }
}
export default AuthorizationMiddleware
