import { Request, Response } from 'express'

export const handleRequest = async (
    req: Request,
    res: Response,
    apiFunction: Function,
) => {
    try {
        const payload = await apiFunction(req.body)
        return typeof payload === 'number'
            ? res.sendStatus(payload)
            : res.json(payload)
    } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
    }
}
