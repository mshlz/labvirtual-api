import { Subject } from "../models/Subject"

export class SubjectService {
    public static async create(data): Promise<any> {
        const result = await new Subject(data).save()

        return result.toJSON()
    }

    public static async list(): Promise<any> {
        const result = await Subject.find({}).populate('discipline', 'id name')

        return result?.map(e => e.toJSON())
    }

    public static async get(id): Promise<any> {
        const result = await Subject.findById(id)
        return result?.toJSON()
    }

    public static async update(id, data): Promise<any> {
        const result = await Subject.updateOne({ _id: id }, data)

        return {
            modified: result.nModified > 0,
            ok: result.ok
        }
    }

}
