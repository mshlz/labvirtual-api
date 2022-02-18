import { model } from 'mongoose'
import { BaseSchema } from '../Base/BaseSchema'
import { IClass } from '../Class/Class'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { IClassworkQuestion } from '../ClassworkQuestion/ClassworkQuestion'
import { IClassTopic } from '../ClassTopic/ClassTopic'

export interface IClasswork {
    name: string
    description?: string
    value?: number
    weight?: number
    dueDate?: Date
    isDraft?: boolean
    class: IClass | string,
    topic: IClassTopic | string,
    questions?: IClassworkQuestion[] | string[]
}

const ClassworkSchema = new BaseSchema<IClasswork>({
    name: { type: String, required: true },
    description: String,
    value: Number,
    weight: Number,
    dueDate: Date,
    isDraft: { type: Boolean, default: true },
    class: { type: String, ref: 'Class', required: true, immutable: true },
    topic: { type: String, ref: 'ClassTopic' },
}, { versionKey: false, timestamps: true })

ClassworkSchema.virtual('questions', {
    ref: 'ClassworkQuestion',
    localField: '_id',
    foreignField: 'classwork',
})

ClassworkSchema.plugin(mongoosePaginator)

export const Classwork = model<IClasswork>('Classwork', ClassworkSchema)
