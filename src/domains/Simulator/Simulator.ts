import { model } from 'mongoose'
import slugify from 'slugify'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { getNanoId } from '../../utils/nanoid'
import { BaseSchema } from '../Base/BaseSchema'
import { IDiscipline } from '../Discipline/Discipline'
import { ISubject } from '../Subject/Subject'

export interface ISimulator {
    name: string
    slug: string
    code: string
    content: string
    disciplines: string[] | IDiscipline[]
    subjects: string[] | ISubject[]
}

const SimulatorSchema = new BaseSchema<ISimulator>({
    name: { type: String, required: true },
    slug: { type: String,/* required: true*/ },
    code: { type: String, default: () => getNanoId(), immutable: true },
    content: { type: String, required: true },
    disciplines: [{ type: String, ref: 'Discipline' }],
    subjects: [{ type: String, ref: 'Subject' }],
}, { versionKey: false, timestamps: true })

SimulatorSchema.pre('save', function (next) {
    // generate slug
    this.slug = slugify(this.name.slice(0, 30), { lower: true }).concat('-', this.code)

    return next()
})

SimulatorSchema.plugin(mongoosePaginator)

export const Simulator = model<ISimulator>('Simulator', SimulatorSchema)
