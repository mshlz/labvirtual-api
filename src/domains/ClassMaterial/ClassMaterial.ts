import { model } from "mongoose";
import mongoosePaginator from "../../utils/database/mongoose-paginator";
import { BaseSchema, BaseSchemaInterface } from "../Base/BaseSchema";
import { IClass } from "../Class/Class";
import { IClassTopic } from "../ClassTopic/ClassTopic";
import { ISubject } from "../Subject/Subject";
import { IUser } from "../User/User";

export interface IClassMaterial extends BaseSchemaInterface {
  description: string;
  class: string | IClass;
  topic: string | IClassTopic;
  author: string | IUser;
  refs: {
    subjects: string[] | ISubject[];
  };
}

const ClassMaterialSchema = new BaseSchema<IClassMaterial>(
  {
    description: { type: String, required: true },
    refs: {
      subjects: [{ type: String, ref: "Subject" }],
    },
    class: { type: String, ref: "Class", required: true, immutable: true },
    topic: { type: String, ref: "ClassTopic", required: true },
    author: { type: String, ref: "User", required: true, immutable: true },
  },
  { versionKey: false, timestamps: true }
);

// ClassMaterialSchema.virtual("questions", {
//   ref: "ClassworkQuestion",
//   localField: "_id",
//   foreignField: "classwork",
// });

ClassMaterialSchema.plugin(mongoosePaginator);

export const ClassMaterial = model<IClassMaterial>("ClassMaterial", ClassMaterialSchema);
