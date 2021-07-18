import { Comment } from "../models/Comment";
import { BaseResourceService } from "./_BaseService";

export class CommentService extends BaseResourceService {
    constructor() { super(Comment) }
}
