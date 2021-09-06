import { GlossaryItem } from './GlossaryItem'
import { BaseResourceService } from '../Base/BaseService'

export class GlossaryService extends BaseResourceService {
    constructor() { super(GlossaryItem) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page, { populate: [{ path: 'discipline', select: 'name id'}, { path: 'subject', select: 'name id'}] })
    }

    // TODO !REGEX CRITICAL
    public async simpleSearch(query = '', page = 1, limit = 10): Promise<any> {
        const result = await GlossaryItem.find({ name: { $regex: query } }).select('_id name').skip(limit * (page - 1)).limit(limit)

        return result?.map(e => e.toJSON())
    }

    public async getFromDiscipline(discipline_id: string): Promise<any> {
        const result = await GlossaryItem.find({ discipline: discipline_id as any }).exec()
        return result?.map(e => e.toJSON())
    }

}
