import { Comment, IComment } from './Comment'
import { Post } from '../Post/Post'
import { BaseResourceService } from '../Base/BaseService'

export class CommentService extends BaseResourceService {
    constructor() { super(Comment) }

    public async create(data: IComment): Promise<any> {
        const post = await Post.findOne({ _id: data.post })
        const result = await super.create({ ...data, post: data.post })

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

export const commentService = new CommentService()
