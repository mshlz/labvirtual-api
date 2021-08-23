import { Document, model, Schema } from "mongoose";
import { v4 } from "uuid";
import mongoosePaginator from "../utils/database/mongoose-paginator";
import { IClass } from "./Class";
import { IComment } from "./Comment";
import { IUser } from "./User";

interface IPost {
    author: IUser
    text: string
    class: IClass | string
    comments: IComment[]
}

const PostSchema = new Schema<IPost & Document>({
    _id: {
        type: String,
        default: v4
    },
    author: { type: String, ref: 'User' },
    class: { type: String, ref: 'Class' },
    text: String,
    comments: [{ type: String, ref: 'Comment' }]
}, { versionKey: false, timestamps: true })

PostSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

PostSchema.plugin(mongoosePaginator)

const Post = model('Post', PostSchema)

export { Post, IPost }