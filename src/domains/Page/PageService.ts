import { Page } from './Page'
import { BaseResourceService } from '../Base/BaseService'
import { NotFoundError } from 'routing-controllers'

export class PageService extends BaseResourceService {
    constructor() { super(Page) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page, { populate: [{ path: 'disciplines', select: 'name id' }, { path: 'subjects', select: 'name id' }] })
    }

    public async get(id: string) {
        const result = await Page.findOne({ _id: id }).populate('disciplines', 'name icon').lean(true).exec()

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async getByCode(code: string) {
        const result = await Page.findOne({ code }).populate('disciplines', 'name').lean(true).exec()

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async getFromDisciplines(disciplines: string[]) {
        return Page.find({ disciplines: { $in: disciplines as any } }).lean(true)
    }

    public async getFromSubjects(subjects: string[]) {
        return Page.find({ subjects: { $in: subjects as any } }).lean(true)
    }
}

export const pageService = new PageService()
