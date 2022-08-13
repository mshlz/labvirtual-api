import { model } from 'mongoose'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { BaseSchema, BaseSchemaInterface } from '../Base/BaseSchema'
import { IClass } from '../Class/Class'
import { IClassTopic } from '../ClassTopic/ClassTopic'
import { IClassworkQuestion } from '../ClassworkQuestion/ClassworkQuestion'
import { IUser } from '../User/User'

const ClassworkStatusEnum = ['DRAFT', 'PUBLISHED'] as const
export type ClassworkStatusType = typeof ClassworkStatusEnum[number]

export interface IClasswork extends BaseSchemaInterface {
    name: string
    description?: string
    value?: number
    weight?: number
    dueDate?: Date
    status: ClassworkStatusType
    author: IUser | string,
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
    status: { type: String, default: 'DRAFT', enum: ClassworkStatusEnum },
    author: { type: String, ref: 'User', required: true, immutable: true },
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
