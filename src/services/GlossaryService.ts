import { GlossaryItem } from "../models/GlossaryItem"

export class GlossaryService {
    public static async create(data): Promise<any> {
        const result = await new GlossaryItem(data).save()

        return result.toJSON()
    }

    public static async list(): Promise<any> {
        const result = await GlossaryItem.find({}).populate('discipline', 'id name').populate('subject', 'id name')

        return result?.map(e => e.toJSON())
    }

    // TODO !REGEX CRITICAL
    public static async simpleSearch(query = '', page = 1, limit = 10): Promise<any> {
        const result = await GlossaryItem.find({ name: { $regex: query } }).select('_id name').skip(limit * (page - 1)).limit(limit)

        return result?.map(e => e.toJSON())
    }

    public static async get(id): Promise<any> {
        const result = await GlossaryItem.findById(id)
        return result?.toJSON()
    }

    public static async update(id, data): Promise<any> {
        const result = await GlossaryItem.updateOne({ _id: id }, data)

        return {
            modified: result.nModified > 0,
            ok: result.ok
        }
    }

    public static async delete(id): Promise<any> {
        const result = await GlossaryItem.deleteOne({ _id: id })

        return {
            deleted: result.deletedCount > 0,
            ok: result.ok
        }
    }

    public static async getFromDiscipline(discipline_id: string): Promise<any> {
        const result = await GlossaryItem.find({ discipline: discipline_id as any }).exec()
        return result?.map(e => e.toJSON())
    }

}
