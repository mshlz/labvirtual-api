import { Discipline } from './Discipline'
import { BaseResourceService } from '../Base/BaseService'

export class DisciplineService extends BaseResourceService {
    constructor() { super(Discipline) }

    async getAllWithSubjects() {
        return Discipline.find({})
            .select('id name icon')
            .populate('subjects', 'id name icon -discipline')
            .lean(true)
    }
}

export const disciplineService = new DisciplineService()
