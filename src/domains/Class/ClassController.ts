import { Body, Delete, Get, JsonController, NotFoundError, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { Authorized, Role } from "../../utils/auth";
import { checkUserOwnership } from "../../utils/auth/utils";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { success } from "../../utils/http/responses";
import { Validate } from "../../utils/validator/Validator";
import { classMaterialService } from "../ClassMaterial/ClassMaterialService";
import { classTopicService } from "../ClassTopic/ClassTopicService";
import { IUser } from "../User/User";
import { Class, IClass } from "./Class";
import { classEnrollmentService } from "./ClassEnrollmentService";
import { classService } from "./ClassService";
import rules from "./validation/rules";

@JsonController("/classes/")
@Authorized()
export class ClassController {
  @Get()
  public async list(@QueryParams() query): Promise<ApiResponse> {
    const classes = await classService.list(query.page, query.per_page);

    return classes;
  }

  @Get("my-classes")
  public async myClasses(@UserFromSession() user: IUser): Promise<ApiResponse> {
    const classes =
      user.type === "STUDENT"
        ? await classService.getClassesFromStudentId(user._id)
        : await classService.getClassesFromTeacherId(user._id);

    return success(classes);
  }

  @Get(":id")
  public async getOne(@Param("id") id: string): Promise<ApiResponse> {
    return success(await classService.get(id));
  }

  @Get(":id/topics")
  public async getTopics(@Param("id") id: string): Promise<ApiResponse> {
    return success(await classTopicService.getFromClasses([id]));
  }

  @Get(":id/materials")
  public async getMaterials(@Param("id") id: string): Promise<ApiResponse> {
    return success(await classMaterialService.getFromClassId(id));
  }

  @Get(":id/people")
  public async getPeople(@Param("id") id: string): Promise<ApiResponse> {
    return success(await classService.getPeopleFromClass(id));
  }

  @Post()
  @Validate(rules.onCreate)
  @Authorized(Role.TEACHER)
  public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
    return success(
      await classService.create({
        ...data,
        teacherId: user._id,
        disciplineId: data.disciplineId || user.permission?.disciplineId,
      })
    );
  }

  @Post("enroll")
  @Validate(rules.onEnroll)
  @Authorized(Role.STUDENT, true)
  public async enroll(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
    const klass = await Class.findOne({ code: data.code }).select("_id name").exec();

    if (!klass) {
      throw new NotFoundError("Turma não encontrada");
    }

    await classEnrollmentService.enrollUser(user._id, klass._id);

    return success(klass.toObject());
  }

  @Post("unenroll")
  @Validate(rules.onUnenroll)
  @Authorized(Role.STUDENT, true)
  public async unenroll(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
    return success(await classEnrollmentService.unenrollUser(user._id, data.classId));
  }

  @Post(":id")
  @Validate(rules.onUpdate)
  @Authorized(Role.TEACHER)
  public async update(
    @Body() data: any,
    @Param("id") id: string,
    @UserFromSession() user: IUser
  ): Promise<ApiResponse> {
    const klass: IClass = await classService.get(id);
    checkUserOwnership(user, () => klass.teacher === user._id);

    return success(await classService.update(id, data));
  }

  @Delete(":id")
  @Authorized(Role.MODERATOR)
  public async delete(@Param("id") id: string): Promise<ApiResponse> {
    return success(await classService.delete(id));
  }
}
