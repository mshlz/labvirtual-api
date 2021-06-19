import { Document, model, Schema } from "mongoose";
import { v4 } from "uuid";
import mongoosePaginator from "../utils/database/mongoose-paginator";
import { IDiscipline } from "./Discipline";
import { ISubject } from "./Subject";

interface IGlossaryItem {
    name: string
    description: string
    discipline: IDiscipline
    subject: ISubject
}

const GlossaryItemSchema = new Schema<IGlossaryItem & Document>({
    _id: {
        type: String,
        default: v4
    },
    name: String,
    description: String,
    discipline: { type: String, ref: 'Discipline' },
    subject: { type: String, ref: 'Subject' },
}, { versionKey: false, timestamps: true })

GlossaryItemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

GlossaryItemSchema.plugin(mongoosePaginator)

const GlossaryItem = model('GlossaryItem', GlossaryItemSchema)

export { GlossaryItem, IGlossaryItem };
