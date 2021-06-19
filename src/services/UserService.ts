import { User } from "../models/User";
import { BaseResourceService } from "./_BaseService";

export class UserService extends BaseResourceService {
    constructor() { super(User) }
}
