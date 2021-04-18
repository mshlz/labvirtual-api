import { Institution } from "../models/Institution"

export class InstitutionService {
    public static async create(data): Promise<any> {
        const result = await new Institution(data).save()

        return result.toJSON()
    }

    public static async list(): Promise<any> {
        const result = await Institution.find({})

        return result?.map(e => e.toJSON())
    }

    public static async get(id): Promise<any> {
        const result = await Institution.findById(id)
        return result?.toJSON()
    }

    public static async update(id, data): Promise<any> {
        const result = await Institution.updateOne({ _id: id }, data)

        return {
            modified: result.nModified > 0,
            ok: result.ok
        }
    }

    public static async delete(id): Promise<any> {
        const result = await Institution.deleteOne({ _id: id })

        return {
            deleted: result.deletedCount > 0,
            ok: result.ok
        }
    }

}
