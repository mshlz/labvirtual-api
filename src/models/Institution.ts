import { Document, model, Schema } from "mongoose";
import { v4 } from 'uuid';
import mongoosePaginator from "../utils/database/mongoose-paginator";

interface IInstitution {
    name: string
    acronym: string
    code: string
    metadata: object
}

const InstitutionSchema = new Schema<IInstitution & Document>({
    _id: {
        type: String,
        default: v4
    },
    name: String,
    acronym: String,
    code: String,
    metadata: Object
}, { versionKey: false, timestamps: true })

InstitutionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

InstitutionSchema.plugin(mongoosePaginator)

const Institution = model('Institution', InstitutionSchema)

export { Institution, IInstitution };
