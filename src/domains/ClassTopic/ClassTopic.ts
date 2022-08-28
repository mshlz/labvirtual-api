import { model } from 'mongoose'
import { BaseSchema, BaseSchemaInterface } from '../Base/BaseSchema'
import { IClass } from '../Class/Class'
import mongoosePaginator from '../../utils/database/mongoose-paginator'

export interface IClassTopic extends BaseSchemaInterface {
    name: string
    class: IClass | string
}

const ClassTopicSchema = new BaseSchema<IClassTopic>({
    name: String,
    class: { type: String, ref: 'Class', immutable: true },
}, { versionKey: false, timestamps: true })

ClassTopicSchema.plugin(mongoosePaginator)

export const ClassTopic = model<IClassTopic>('ClassTopic', ClassTopicSchema)
