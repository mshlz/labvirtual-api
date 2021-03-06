import { Document, model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

interface IUser {
    name: string
    email: string
    password: string
    type: string
    meta: object
    checkPassword: (p: string) => boolean
}

const UserSchema = new Schema<IUser & Document>({
    name: String,
    email: String,
    password: String,
    type: String,
    meta: Object
}, { toObject: { flattenMaps: true } })

UserSchema.pre('save', function (next) {
    let user = this
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

const User = model('User', UserSchema)

export { User, IUser }