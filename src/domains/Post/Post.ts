import { model } from 'mongoose'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { BaseSchema } from '../Base/BaseSchema'
import { IClass } from '../Class/Class'
import { IComment } from '../Comment/Comment'
import { IUser } from '../System/User/User'

interface IPost {
    author: IUser
    text: string
    class: IClass | string
    comments: IComment[]
}

const PostSchema = new BaseSchema<IPost>({
    author: { type: String, ref: 'User' },
    class: { type: String, ref: 'Class' },
    text: String,
    comments: [{ type: String, ref: 'Comment' }]
}, { versionKey: false, timestamps: true })

PostSchema.plugin(mongoosePaginator)

const Post = model<IPost>('Post', PostSchema)

export { Post, IPost }
