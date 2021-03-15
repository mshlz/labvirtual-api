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

const Discipline = model('Discipline', DisciplineSchema)

export { Discipline, IDiscipline }