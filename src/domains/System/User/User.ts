import bcrypt from 'bcrypt';
import { model } from "mongoose";
import { BaseSchema } from "../../Base/BaseSchema";
import mongoosePaginator from "../../../utils/database/mongoose-paginator";

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
    meta: object
    checkPassword: (p: string) => boolean
    toPublicJSON: () => object
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
    meta: Object
}, { versionKey: false, timestamps: true, toObject: { getters: true } })

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

UserSchema.plugin(mongoosePaginator)

const User = model<IUser>('User', UserSchema)

export { User, IUser };
