import { model } from "mongoose";
import slugify from "slugify";
import mongoosePaginator from "../../utils/database/mongoose-paginator";
import { getNanoId } from "../../utils/nanoid";
import { BaseSchema } from "../Base/BaseSchema";
import { IDiscipline } from "../Discipline/Discipline";
import { IPageSection } from "../PageSection/PageSection";
import { ISubject } from "../Subject/Subject";

export interface IPage {
  name: string;
  slug: string;
  code: string;
  icon: string;
  content: string;
  section: string | IPageSection;
  disciplines: string[] | IDiscipline[];
  subjects: string[] | ISubject[];
}

const PageSchema = new BaseSchema<IPage>(
  {
    name: { type: String, required: true },
    icon: { type: String },
    slug: { type: String /* required: true*/ },
    code: { type: String, default: () => getNanoId(), immutable: true },
    content: { type: String, required: true },
    section: { type: String, ref: "PageSection" },
    disciplines: [{ type: String, ref: "Discipline" }],
    subjects: [{ type: String, ref: "Subject" }],
  },
  { versionKey: false, timestamps: true }
);

PageSchema.pre("save", function (next) {
  // generate slug
  this.slug = slugify(this.name.slice(0, 30), { lower: true }).concat(
    "-",
    this.code
  );
  return next();
});
PageSchema.pre("updateOne", function (next) {
  this.slug = slugify(this.name.slice(0, 30), { lower: true }).concat(
    "-",
    this.code
  );
  return next();
});

PageSchema.plugin(mongoosePaginator);

export const Page = model<IPage>("Page", PageSchema);
