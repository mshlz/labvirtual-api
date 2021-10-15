import { Subject } from './Subject'
import { BaseResourceService } from '../Base/BaseService'

export class SubjectService extends BaseResourceService {
    constructor() { super(Subject) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page, { populate: [{ path: 'discipline', select: 'name id' }] })
    }

    public async getFromDisciplines(discipline_ids: string): Promise<any> {
        return Subject.find({ discipline: { $in: discipline_ids } as any }).select('-createdAt -updatedAt').lean(true).exec()
    }

}

export const subjectService = new SubjectService()
