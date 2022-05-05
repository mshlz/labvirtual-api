import { PageSection } from './PageSection'
import { BaseResourceService } from '../Base/BaseService'
import { NotFoundError } from 'routing-controllers'

export class PageSectionService extends BaseResourceService {
    constructor() { super(PageSection) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page)
    }

    public async get(id: string) {
        const result = await PageSection.findOne({ _id: id }).lean(true).exec()

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async getBySlug(slug: string) {
        const result = await PageSection.findOne({ slug }).lean(true).exec()

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async getNameByIds(ids: string[]) {
        const result = await PageSection.find({ _id: { $in: ids } }).select('name slug').lean(true).exec()
        return result
    }

}

export const pageSectionService = new PageSectionService()
