import { User } from "../../models/User";

export class UserService {
    public async update(user_id, data): Promise<any> {
        const result = await User.updateOne({ _id: user_id }, data)

        return {
            modified: result.nModified > 0,
            ok: result.ok
        }
    }

    public async delete(user_id): Promise<any> {
        const result = await User.deleteOne({ _id: user_id })

        return {
            deleted: result.deletedCount > 0,
            ok: result.ok
        }
    }

}
