import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { IPost } from '../Post/Post'
import { IUser } from '../System/User/User'

interface IComment {
    author: IUser
    post: string | IPost
    text: string
}

const CommentSchema = new BaseSchema<IComment>({
    author: { type: String, ref: 'User'},
    post: { type: String, ref: 'Post'},
    text: String
}, { versionKey: false, timestamps: true })

CommentSchema.plugin(mongoosePaginator)

const Comment = model<IComment>('Comment', CommentSchema)

export { Comment, IComment }
