import * as bcryptjs from 'bcryptjs'

export const hashPassword = (password: string): string => {
    return bcryptjs.hashSync(password)
}

export const comparePassword = (toCompare: string, fromDb: string): boolean => {
    return bcryptjs.compareSync(toCompare, fromDb)
}
