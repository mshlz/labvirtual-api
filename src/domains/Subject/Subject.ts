import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import { IDiscipline } from '../Discipline/Discipline'
import mongoosePaginator from '../../utils/database/mongoose-paginator'

interface ISubject {
    name: string
    code: string
    discipline: string | IDiscipline
}

const SubjectSchema = new BaseSchema<ISubject>({
    name: String,
    code: String,
    discipline: { type: String, ref: 'Discipline' },
}, { versionKey: false, timestamps: true })

SubjectSchema.plugin(mongoosePaginator)

const Subject = model<ISubject>('Subject', SubjectSchema)

export { Subject, ISubject }
