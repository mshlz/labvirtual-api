import bcrypt from "bcrypt";
import { model } from "mongoose";
import { Roles } from "../../utils/auth";
import mongoosePaginator from "../../utils/database/mongoose-paginator";
import { BaseSchema } from "../Base/BaseSchema";
import { IClass } from "../Class/Class";

export type UserType = "TEACHER" | "STUDENT" | "ADMIN";
export interface IUserPermission {
  role: Roles;
  disciplineId?: string;
}
export interface IUser {
  _id: string; // TODO find a better way to resolve typing for this
  name: string;
  email: string;
  active: boolean;
  phone: string;
  birthdate: string;
  password: string;
  school: string;
  course: string;
  type: UserType;
  permission?: IUserPermission;
  classes: IClass[] | string[];
  meta: Record<string, unknown>;
  checkPassword: (p: string) => boolean;
}

const UserSchema = new BaseSchema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    active: { type: Boolean, default: false },
    phone: String,
    birthdate: String,
    school: String,
    course: String,
    type: { type: String, required: true, default: "STUDENT" },
    permission: { type: {} },
    classes: [{ type: String, ref: "Class", select: false }],
    meta: Object,
  },
  { versionKey: false, timestamps: true }
);

// BeforeSave hook
UserSchema.pre("save", function (next) {
  // eslint-disable-next-line
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, function (err, encrypted) {
    if (err) return next(err);
    user.password = encrypted;
    next();
  });
});

UserSchema.methods.checkPassword = function (raw): boolean {
  return bcrypt.compareSync(raw, this.password);
};

UserSchema.plugin(mongoosePaginator);

export const User = model<IUser>("User", UserSchema);
