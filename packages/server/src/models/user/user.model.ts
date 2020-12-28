import {
    getModelForClass,
    mongoose,
    prop,
    ReturnModelType,
} from '@typegoose/typegoose'

export class UserProps {
    @prop({ required: true, type: String })
    public _id!: string

    @prop({ required: true, type: String })
    public email!: string

    @prop({ required: true, minlength: 6, type: String })
    public password!: string

    @prop({ required: true, type: String, minlength: 6 })
    public name!: string
}

export const UserModel: mongoose.Model<
    UserProps & mongoose.Document
> = getModelForClass(UserProps, { schemaOptions: { collection: 'users' } })
