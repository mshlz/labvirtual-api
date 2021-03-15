import { Document, model, ObjectId, Schema } from "mongoose";
import bcrypt from 'bcrypt'

interface IUser {
    _id?: ObjectId
    name: string
    email: string
    phone: string
    birthdate: string
    password: string
    school: string
    course: string
    type: string
    meta: object
    checkPassword: (p: string) => boolean
    toPublicJSON: () => object
}

const UserSchema = new Schema<IUser & Document>({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    birthdate: String,
    school: String,
    course: String,
    type: String,
    meta: Object
}, { toObject: { versionKey: false, getters: true } })

// BeforeSave hook
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

UserSchema.methods.toPublicJSON = function () {
    return {
        id: this.id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        birthdate: this.birthdate,
        school: this.school,
        course: this.course,
        type: this.type,
        meta: this.meta,
    }
}

const User = model('User', UserSchema)

export { User, IUser }