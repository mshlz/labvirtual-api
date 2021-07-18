import { Document, model, Schema } from "mongoose";
import { v4 } from 'uuid'
import mongoosePaginator from "../utils/database/mongoose-paginator";
import { IPost } from "./Post";
import { IUser } from "./User";

interface IComment {
    author: IUser
    post: IPost
    text: string
}

const CommentSchema = new Schema<IComment & Document>({
    _id: {
        type: String,
        default: v4
    },
    author: { type: String, ref: 'User'},
    post: { type: String, ref: 'Post'},
    text: String
}, { versionKey: false, timestamps: true })

CommentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

CommentSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

CommentSchema.plugin(mongoosePaginator)

const Comment = model('Comment', CommentSchema)

export { Comment, IComment }