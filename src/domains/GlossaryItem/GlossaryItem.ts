import { model } from "mongoose";
import { BaseSchema } from "../Base/BaseSchema";
import { IDiscipline } from "../Discipline/Discipline";
import { ISubject } from "../Subject/Subject";
import mongoosePaginator from "../../utils/database/mongoose-paginator";

interface IGlossaryItem {
    name: string
    description: string
    discipline: string | IDiscipline
    subject: string | ISubject
}

const GlossaryItemSchema = new BaseSchema<IGlossaryItem>({
    name: String,
    description: String,
    discipline: { type: String, ref: 'Discipline' },
    subject: { type: String, ref: 'Subject' },
}, { versionKey: false, timestamps: true })

GlossaryItemSchema.plugin(mongoosePaginator)

const GlossaryItem = model<IGlossaryItem>('GlossaryItem', GlossaryItemSchema)

export { GlossaryItem, IGlossaryItem };
