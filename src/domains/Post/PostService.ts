import { BaseResourceService } from '../Base/BaseService'
import { Post } from './Post'

export class PostService extends BaseResourceService {
    constructor() { super(Post) }

    public async getFromClass(classId: string) {
        return Post.find({ class: classId })
            .sort({ createdAt: -1 })
            .populate('author', 'name -_id')
            .populate({ path: 'comments', select: 'author createdAt text', populate: { path: 'author', select: 'name' } })
            .lean(true)
    }
}

export const postService = new PostService()
