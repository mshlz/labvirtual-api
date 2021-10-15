import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import { IDiscipline } from '../Discipline/Discipline'
import mongoosePaginator from '../../utils/database/mongoose-paginator'

export interface ISubject {
    name: string
    discipline: IDiscipline | string
}

const SubjectSchema = new BaseSchema<ISubject>({
    name: { type: String, required: true },
    discipline: { type: String, ref: 'Discipline', required: true },
}, { versionKey: false, timestamps: true })

SubjectSchema.plugin(mongoosePaginator)

export const Subject = model<ISubject>('Subject', SubjectSchema)
