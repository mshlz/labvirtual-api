import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import { IClass } from '../Class/Class'
import mongoosePaginator from '../../utils/database/mongoose-paginator'

interface IClasswork {
    name: string
    description: string
    value: number
    weight: number
    dueDate: Date
    class: IClass | string
}

const ClassworkSchema = new BaseSchema<IClasswork>({
    name: String,
    description: String,
    value:  Number,
    weight:  Number,
    dueDate: Date,
    class: { type: String, ref: 'Class' },
}, { versionKey: false, timestamps: true })

ClassworkSchema.plugin(mongoosePaginator)

const Classwork = model<IClasswork>('Classwork', ClassworkSchema)

export { Classwork, IClasswork }
