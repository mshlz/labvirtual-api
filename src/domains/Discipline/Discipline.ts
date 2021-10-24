import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import mongoosePaginator from '../../utils/database/mongoose-paginator'

export interface IDiscipline {
    name: string
    icon?: string
}

const DisciplineSchema = new BaseSchema<IDiscipline>({
    name: String,
    icon: String,
}, { versionKey: false, timestamps: true })

DisciplineSchema.virtual('subjects', {
    ref: 'Subject',
    localField: '_id',
    foreignField: 'discipline'
})

DisciplineSchema.plugin(mongoosePaginator)

export const Discipline = model<IDiscipline>('Discipline', DisciplineSchema)
