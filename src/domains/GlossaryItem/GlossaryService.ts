import { GlossaryItem } from './GlossaryItem'
import { BaseResourceService } from '../Base/BaseService'
import { escapeStringRegexp } from '../../utils/helpers'

export class GlossaryService extends BaseResourceService {
    constructor() { super(GlossaryItem) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page, { populate: [{ path: 'discipline', select: 'name id' }, { path: 'subject', select: 'name id' }] })
    }

    public async simpleSearch(query = '', page = 1, limit = 10): Promise<any> {
        return GlossaryItem.find({ name: { $regex: escapeStringRegexp(query) } })
            .select('_id name')
            .lean(true)
            .skip(limit * (page - 1))
            .limit(limit)
    }

    public async getFromDiscipline(disciplines: string[]): Promise<any> {
        return GlossaryItem.find({ discipline: { $in: disciplines } }).lean(true).exec()
    }

}

export const glossaryService = new GlossaryService()
