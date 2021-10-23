import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import mongoosePaginator from '../../utils/database/mongoose-paginator'

export interface IInstitution {
    name: string
    acronym: string
    code: string
    metadata: Record<string, any>
}

const InstitutionSchema = new BaseSchema<IInstitution>({
    name: String,
    acronym: String,
    code: String,
    metadata: Object
}, { versionKey: false, timestamps: true })

InstitutionSchema.plugin(mongoosePaginator)

export const Institution = model<IInstitution>('Institution', InstitutionSchema)
