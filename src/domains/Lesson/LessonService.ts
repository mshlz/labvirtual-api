import { Lesson } from './Lesson'
import { BaseResourceService } from '../Base/BaseService'
import { NotFoundError } from 'routing-controllers'

export class LessonService extends BaseResourceService {
    constructor() { super(Lesson) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page, { populate: [{ path: 'discipline', select: 'name id' }, { path: 'subject', select: 'name id' }] })
    }

    public async get(id: string) {
        const result = await Lesson.findOne({ _id: id }).populate('discipline', 'name icon').lean(true).exec()

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async getByCode(code: string) {
        const result = await Lesson.findOne({ code }).populate('discipline', 'name').lean(true).exec()

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async getFromDisciplines(disciplines: string[]) {
        return Lesson.find({ discipline: { $in: disciplines } }).lean(true)
    }

    public async getFromSubjects(subjects: string[]) {
        return Lesson.find({ subject: { $in: subjects } }).lean(true)
    }
}

export const lessonService = new LessonService()
