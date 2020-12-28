import { UserModel } from '../../../models/user/user.model'
import { IsString } from 'class-validator'

class CheckAccountDto {
    @IsString()
    public email: string
}
export { CheckAccountDto }

export const checkAccount = async (data: CheckAccountDto) => {
    const exists = await UserModel.findOne({ email: data.email }, '_id')
    return exists?._id ? true : false
}
