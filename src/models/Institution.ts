import { Document, model, Schema } from "mongoose";
import { v4 } from 'uuid'

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
})

InstitutionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

const Institution = model('Institution', InstitutionSchema)

export { Institution, IInstitution }