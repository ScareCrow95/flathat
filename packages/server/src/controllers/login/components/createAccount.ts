import { checkAccount } from './checkAccount'
import { hashPassword } from './../../../utils/hashPassword'
import { uuid } from 'uuidv4'
import { UserModel } from '../../../models/user/user.model'
import { IsString } from 'class-validator'
import HttpException from '../../../middleware/exceptions/HttpException'

export class AccountDto {
    @IsString()
    public name: string

    @IsString()
    public email: string

    @IsString()
    public password: string
}

export const createAccount = async (data: AccountDto) => {
    if (!(await checkAccount(data))) {
        const newUser = new UserModel({
            ...data,
            _id: uuid(),
            password: hashPassword(data.password),
        })
        await newUser.save()
        return true
    } else {
        throw new HttpException(400, 'email is taken')
    }
}
