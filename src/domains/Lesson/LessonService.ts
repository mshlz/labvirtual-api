import { Lesson } from './Lesson'
import { BaseResourceService } from '../Base/BaseService'

export class LessonService extends BaseResourceService {
    constructor() { super(Lesson) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page, { populate: [{ path: 'discipline', select: 'name id'}, { path: 'subject', select: 'name id'}] })
    }

    public async getFromDiscipline(discipline_id: string): Promise<any> {
        const result = await Lesson.find({ discipline: discipline_id as any }).exec()
        return result?.map(e => e.toJSON())
    }

}
