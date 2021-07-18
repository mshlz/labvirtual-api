import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { BaseResourceService } from "./_BaseService";

export class CommentService extends BaseResourceService {
    constructor() { super(Comment) }

    public async create(data): Promise<any> {
        const post = await Post.findOne({ _id: data.post_uuid })
        const result = await super.create({ ...data, post: data.post_uuid })

        post.comments.push(result.id)
        await post.save()

        return result
    }

    public async delete(id: string): Promise<any> {
        const comment = await Comment.findOne({ _id: id })
        await Post.updateOne({ _id: comment.post }, { $pull: { comments: comment.id } })

        return super.delete(id)
    }
}
