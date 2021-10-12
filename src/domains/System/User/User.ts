import bcrypt from 'bcrypt'
import { model } from 'mongoose'
import { BaseSchema } from '../../Base/BaseSchema'
import mongoosePaginator from '../../../utils/database/mongoose-paginator'
import { IClass } from '../../Class/Class'

interface IUser {
    _id: string
    name: string
    email: string
    phone: string
    birthdate: string
    password: string
    school: string
    course: string
    type: string
    classes: IClass[] | string[]
    meta: Record<string, unknown>
    checkPassword: (p: string) => boolean
}

const UserSchema = new BaseSchema<IUser>({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    birthdate: String,
    school: String,
    course: String,
    type: String,
    classes: [{ type: String, ref: 'Class', select: false }],
    meta: Object
}, { versionKey: false, timestamps: true })

// BeforeSave hook
UserSchema.pre('save', function (next) {
    // eslint-disable-next-line
    const user = this
    if (!user.isModified('password')) return next()

    bcrypt.hash(user.password, 10, function (err, encrypted) {
        if (err) return next(err)
        user.password = encrypted
        next()
    })
})

UserSchema.methods.checkPassword = function (raw): boolean {
    return bcrypt.compareSync(raw, this.password)
}

UserSchema.plugin(mongoosePaginator)

const User = model<IUser>('User', UserSchema)

export { User, IUser }
