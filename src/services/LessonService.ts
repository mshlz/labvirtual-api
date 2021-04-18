import { Lesson } from "../models/Lesson"

export class LessonService {
    public static async create(data): Promise<any> {
        const result = await new Lesson(data).save()

        return result.toJSON()
    }

    public static async list(): Promise<any> {
        const result = await Lesson.find({}).populate('discipline', 'id name').populate('subject', 'id name')

        return result?.map(e => e.toJSON())
    }

    public static async get(id): Promise<any> {
        const result = await Lesson.findById(id)
        return result?.toJSON()
    }

    public static async update(id, data): Promise<any> {
        const result = await Lesson.updateOne({ _id: id }, data)

        return {
            modified: result.nModified > 0,
            ok: result.ok
        }
    }

    public static async delete(id): Promise<any> {
        const result = await Lesson.deleteOne({ _id: id })

        return {
            deleted: result.deletedCount > 0,
            ok: result.ok
        }
    }

    public static async getFromDiscipline(discipline_id: string): Promise<any> {
        const result = await Lesson.find({ discipline: discipline_id as any }).exec()
        return result?.map(e => e.toJSON())
    }

}
