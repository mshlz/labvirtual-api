import { model } from "mongoose";
import { BaseSchema } from "../Base/BaseSchema";
import { IDiscipline } from "../Discipline/Discipline";
import mongoosePaginator from "../../utils/database/mongoose-paginator";
import { IUser } from "../User/User";
import { getNanoId } from "../../utils/nanoid";
import { IInstitution } from "../Institution/Institution";

export interface IClass {
  name: string;
  description: string;
  code: string;
  discipline: string | IDiscipline;
  institution: string | IInstitution;
  teacher: string | IUser;
  students: IUser[];
}

const ClassSchema = new BaseSchema<IClass>(
  {
    name: String,
    description: String,
    code: { type: String, default: () => getNanoId(), immutable: true },
    discipline: { type: String, ref: "Discipline", required: true },
    institution: { type: String, ref: "Institution", required: true },
    teacher: { type: String, ref: "User" },
    students: [{ type: String, ref: "User", select: false }],
  },
  { versionKey: false, timestamps: true }
);

ClassSchema.plugin(mongoosePaginator);

export const Class = model<IClass>("Class", ClassSchema);
