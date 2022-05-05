import { Page } from './Page'
import { BaseResourceService } from '../Base/BaseService'
import { NotFoundError } from 'routing-controllers'
import { pageSectionService } from '../PageSection/PageSectionService'

export class PageService extends BaseResourceService {
    constructor() { super(Page) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page, { populate: [{ path: 'section', select: 'name id' }, { path: 'author', select: 'name id' }] })
    }

    public async get(id: string) {
        const result = await Page.findOne({ _id: id }).populate('section', 'name id').populate('author', 'name id').lean(true).exec()

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async getByCode(code: string) {
        const result = await Page.findOne({ code }).populate('section', 'icon name').populate('author', 'name id').lean(true).exec()

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async getRouterInfo() {
        const pages = await Page.find({})
            .select('-_id code slug name section')
            .lean(true)
            .exec()
        const sectionIds = [...new Set(pages.map(v => v.section as string))]

        return {
            sections: await pageSectionService.getNameByIds(sectionIds),
            pages
        }
    }

    public async getFromSections(sections: string[]) {
        return Page.find({ section: { $in: sections } }).lean(true)
    }

}

export const pageService = new PageService()
