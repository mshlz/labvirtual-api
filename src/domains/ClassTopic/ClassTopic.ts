import { model } from "mongoose";
import { BaseSchema } from "../Base/BaseSchema";
import { IClass } from "../Class/Class";
import mongoosePaginator from "../../utils/database/mongoose-paginator";

interface IClassTopic {
    name: string
    class: IClass | string
}

const ClassTopicSchema = new BaseSchema<IClassTopic>({
    name: String,
    class: { type: String, ref: 'Class' },
}, { versionKey: false, timestamps: true })

ClassTopicSchema.plugin(mongoosePaginator)

const ClassTopic = model<IClassTopic>('ClassTopic', ClassTopicSchema)

export { ClassTopic, IClassTopic };

