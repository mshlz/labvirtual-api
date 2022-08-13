import { model } from 'mongoose'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { BaseSchema } from '../Base/BaseSchema'
import { IClass } from '../Class/Class'
import { IComment } from '../Comment/Comment'
import { IUser } from '../User/User'

export interface IPost {
    author: IUser
    text: string
    class: IClass | string
    comments: string[] | IComment[]
}

const PostSchema = new BaseSchema<IPost>({
    author: { type: String, ref: 'User', required: true, immutable: true },
    class: { type: String, ref: 'Class', required: true, immutable: true },
    text: String,
    comments: [{ type: String, ref: 'Comment' }]
}, { versionKey: false, timestamps: true })

PostSchema.plugin(mongoosePaginator)

export const Post = model<IPost>('Post', PostSchema)
