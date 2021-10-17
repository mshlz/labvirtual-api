import { Document, Model } from 'mongoose'
import { NotFoundError } from 'routing-controllers'
import { PaginationResult } from '../../utils/database/mongoose-paginator'

export class BaseResourceService<T extends Model<Document> & { paginate?: (...args: any) => Promise<PaginationResult<T>> } = any> {
    constructor(protected model: T) { }

    public async create(data): Promise<any> {
        const result = await new this.model(data).save()

        return result.toJSON()
    }

    public async list(page?: number, per_page?: number, options?: any) {
        return await this.model.paginate({}, { page, per_page, /*leanWithId: true,*/ lean: true, ...options })
    }

    public async get(id: string) {
        const result = await this.model.findById(id).lean(true)

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async update(id: string, data: any) {
        const result = await this.model.updateOne({ _id: id }, data)

        if (result.modifiedCount === 0) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return true
    }

    public async delete(id: string) {
        const result = await this.model.deleteOne({ _id: id })

        if (result.deletedCount === 0) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return true
    }

    // no plan to use now
    // protected async middleware(fn: () => Promise<T>, condition?: (result: T) => boolean, exception?: (result: T) => never) {
    //     if (!condition) {
    //         condition = (result: T) => !!result
    //     }
    //     if (!exception) {
    //         exception = (result: T) => { throw new NotFoundError('Objeto não encontrado') }
    //     }

    //     const result = await fn()

    //     if (!condition(result)) {
    //         exception(result)
    //     }

    //     return result
    // }

}
