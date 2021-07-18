import { Post } from "../models/Post";
import { BaseResourceService } from "./_BaseService";

export class PostService extends BaseResourceService {
    constructor() { super(Post) }
}
