import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { IPost } from '../Post/Post'
import { IUser } from '../User/User'

export interface IComment {
    author: string | IUser
    post: string | IPost
    text: string
}

const CommentSchema = new BaseSchema<IComment>({
    author: { type: String, ref: 'User', required: true, immutable: true },
    post: { type: String, ref: 'Post', required: true, immutable: true },
    text: { type: String, required: true }
}, { versionKey: false, timestamps: true })

CommentSchema.plugin(mongoosePaginator)

export const Comment = model<IComment>('Comment', CommentSchema)
