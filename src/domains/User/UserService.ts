import { BaseResourceService } from "../Base/BaseService";
import { IUser, IUserPermission, User, UserType } from "./User";

export class UserService extends BaseResourceService {
  constructor() {
    super(User);
  }

  public async create(
    data: IUser,
    type?: UserType,
    permission?: IUserPermission,
    active?: boolean
  ) {
    const user = new User();
    user.name = data.name?.trim();
    user.email = data.email?.trim().toLowerCase();
    user.phone = data.phone?.trim().toLowerCase();
    user.birthdate = data.birthdate;
    user.password = data.password;
    user.school = data.school;
    user.type = type || "STUDENT";
    user.permission = permission;
    user.active = active || false;

    await user.save();

    return {
      ...user.toJSON(),
      password: undefined, // TODO: create publicJson() in model
    };
  }

  public async changePassword(userId: string, newPassword: string) {
    const user = await User.findOne({ _id: userId });

    user.password = newPassword;
    await user.save();

    return true;
  }

  public async updatePermission(
    userId: string,
    permission: Partial<IUserPermission>
  ) {
    const user = await User.findOne({ _id: userId });

    user.permission = {
      ...user.permission,
      ...permission,
    };
    await user.save();

    return true;
  }

  public async listTeachers() {
    const list = await User.find({ type: "TEACHER" })
    //   .select("id name")
      .lean(true);

    return list;
  }

  public async listTeachersMinimal() {
    const list = await User.find({ type: "TEACHER" })
      .select("id name")
      .lean(true);

    return list;
  }
}

export const userService = new UserService();
