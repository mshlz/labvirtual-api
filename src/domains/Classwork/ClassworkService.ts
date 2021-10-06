import { Classwork } from './Classwork'
import { BaseResourceService } from '../Base/BaseService'

export class ClassworkService extends BaseResourceService {
    constructor() { super(Classwork) }
}

export const classworkService = new ClassworkService()
