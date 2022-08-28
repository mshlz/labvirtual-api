import { Body, JsonController, Post } from "routing-controllers";
import { ENV } from "../../config/env";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { Authorized, Role } from "../../utils/auth";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { success } from "../../utils/http/responses";
import { getNanoId, getNanoIdAsync } from "../../utils/nanoid";
import { Validate } from "../../utils/validator/Validator";
import { IUser } from "./User";
import { userService } from "./UserService";
import rules from "./validation/rules";

@JsonController("/admin/")
export class AdminUserController {
  @Post("seed-root")
  public async seed(): Promise<ApiResponse> {
    const rootEmail = "root@lab.app";
    try {
      const password = ENV != "prod" ? "root123" : await getNanoIdAsync(6);
      const user = await userService.create(
        {
          email: rootEmail,
          password,
          name: "Labvis Root",
          active: true,
        } as any,
        "ADMIN",
        {
          role: "ROOT",
        }
      );

      return success({ credentials: { email: user.email, password } });
    } catch (err) {}

    return success({});
  }

  @Post("list-teachers")
  @Authorized(Role.ROOT)
  public async listTeachers(
    @Body() data: any,
  ): Promise<ApiResponse> {
    const teachers = await userService.listTeachers()

    return success(teachers);
  }

  @Post("create-teacher")
  @Validate(rules.admin.createTeacher)
  @Authorized(Role.ROOT)
  public async createTeacher(
    @Body() data: any,
    @UserFromSession() user: IUser
  ): Promise<ApiResponse> {
    const password = getNanoId(6);
    const teacher = await userService.create({ ...data, password }, "TEACHER", {
      role: "TEACHER",
      disciplineId: data.disciplineId,
    });

    return success({ teacher, password }); // TODO check
  }

  @Post("change-permission")
  @Validate(rules.admin.changePermission)
  @Authorized(Role.ROOT)
  public async changePermission(@Body() data: any): Promise<ApiResponse> {
    await userService.updatePermission(data.userId, {
      disciplineId: data.disciplineId,
      role: data.role,
    });

    return success(true);
  }
}
