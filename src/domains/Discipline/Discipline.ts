import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import mongoosePaginator from '../../utils/database/mongoose-paginator'

interface IDiscipline {
    name: string
    code: string
    metadata: Record<string, any>
}

const DisciplineSchema = new BaseSchema<IDiscipline>({
    name: String,
    code: String,
    metadata: Object
}, { versionKey: false, timestamps: true })

DisciplineSchema.plugin(mongoosePaginator)

const Discipline = model<IDiscipline>('Discipline', DisciplineSchema)

export { Discipline, IDiscipline }
