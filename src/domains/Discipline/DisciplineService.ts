import { Discipline } from './Discipline'
import { BaseResourceService } from '../Base/BaseService'

export class DisciplineService extends BaseResourceService {
    constructor() { super(Discipline) }
}

export const disciplineService = new DisciplineService()
