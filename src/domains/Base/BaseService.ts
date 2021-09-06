import { Document, Model } from 'mongoose'
import { PaginationResult } from '../../utils/database/mongoose-paginator'

export class BaseResourceService<T extends Model<Document> & { paginate?: (...args: any) => Promise<PaginationResult<T>>} = any> {
    constructor(private model: T) {}

    public async create(data): Promise<any> {
        const result = await new this.model(data).save()

        return result.toJSON()
    }

    public async list(page?: number, per_page?: number, options?: any) {
        return await this.model.paginate({}, { page, per_page, leanWithId: true, lean: true, ...options })
    }

    public async get(id: string) {
        const result = await this.model.findById(id)
        return result?.toJSON()
    }

    public async update(id: string, data: any): Promise<any> {
        const result = await this.model.updateOne({ _id: id }, data)

        return {
            modified: result.modifiedCount > 0
        }
    }

    public async delete(id: string): Promise<any> {
        const result = await this.model.deleteOne({ _id: id })

        return {
            deleted: result.deletedCount > 0
        }
    }

}
