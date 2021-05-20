import { Document, model, Schema } from "mongoose";
import { v4 } from 'uuid'

interface IDiscipline {
    name: string
    code: string
    metadata: object
}

const DisciplineSchema = new Schema<IDiscipline & Document>({
    _id: {
        type: String,
        default: v4
    },
    name: String,
    code: String,
    metadata: Object
}, { versionKey: false, timestamps: true })

DisciplineSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

const Discipline = model('Discipline', DisciplineSchema)

export { Discipline, IDiscipline }