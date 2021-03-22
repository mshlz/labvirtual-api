import { Class } from "../models/Class"

export class ClassService {
    public static async create(data): Promise<any> {
        const result = await new Class(data).save()

        return result.toJSON()
    }

    public static async list(): Promise<any> {
        const result = await Class.find({}).populate('discipline', 'id name')

        return result?.map(e => e.toJSON())
    }

    public static async get(id): Promise<any> {
        const result = await Class.findById(id)
        return result?.toJSON()
    }

    public static async update(id, data): Promise<any> {
        const result = await Class.updateOne({ _id: id }, data)

        return {
            modified: result.nModified > 0,
            ok: result.ok
        }
    }

}
