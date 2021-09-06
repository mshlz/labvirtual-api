import { BaseResourceService } from '../Base/BaseService'
import { Post } from './Post'

export class PostService extends BaseResourceService {
    constructor() { super(Post) }

    public async listFromClassUuid(class_uuid: string) {
        const result = await Post.find({ class: class_uuid }).sort({ createdAt: -1 }).populate('author', 'name -_id').populate({ path: 'comments', select:'author createdAt text',populate: { path: 'author', select: 'name'}}).lean()

        return result
    }
}
