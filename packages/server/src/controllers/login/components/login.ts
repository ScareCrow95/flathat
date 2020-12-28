import { comparePassword } from './../../../utils/hashPassword'
import { createToken } from './../../../utils/jwt/createJWT'
import { UserModel, UserProps } from '../../../models/user/user.model'
import { IsString } from 'class-validator'
import HttpException from '../../../middleware/exceptions/HttpException'

class LoginDto {
    @IsString()
    public email: string

    @IsString()
    public password: string
}

export { LoginDto }

export const login = async (data: LoginDto) => {
    const userData: Partial<UserProps> = (await UserModel.findOne(
        { email: data.email },
        'email password',
    ).lean()) as Partial<UserProps>

    const token = createToken(userData._id)

    if (!userData) {
        throw new HttpException(400, 'email or password is wrong')
    } else {
        if (comparePassword(data.password, userData.password)) {
            delete userData.password
            return { user: userData, token }
        } else throw new HttpException(400, 'email or password is wrong')
    }
}
