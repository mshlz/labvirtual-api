import { Document, model, Schema } from "mongoose";

interface IDiscipline {
    name: string
    code: string
    metadata: object
}

const DisciplineSchema = new Schema<IDiscipline & Document>({
    name: String,
    code: String,
    metadata: Object
})

DisciplineSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

const Discipline = model('Discipline', DisciplineSchema)

export { Discipline, IDiscipline }