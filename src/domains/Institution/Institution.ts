import { model } from "mongoose";
import { BaseSchema } from "../Base/BaseSchema";
import mongoosePaginator from "../../utils/database/mongoose-paginator";

interface IInstitution {
    name: string
    acronym: string
    code: string
    metadata: object
}

const InstitutionSchema = new BaseSchema<IInstitution>({
    name: String,
    acronym: String,
    code: String,
    metadata: Object
}, { versionKey: false, timestamps: true })

InstitutionSchema.plugin(mongoosePaginator)

const Institution = model<IInstitution>('Institution', InstitutionSchema)

export { Institution, IInstitution };
