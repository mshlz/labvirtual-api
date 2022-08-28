import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { Authorized, Role } from "../../utils/auth";
import { checkUserOwnership } from "../../utils/auth/utils";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { success } from "../../utils/http/responses";
import { Validate } from "../../utils/validator/Validator";
import { IClass } from "../Class/Class";
import { classService } from "../Class/ClassService";
import { IUser } from "../User/User";
import { classTopicService } from "./ClassTopicService";
import rules from "./validation/rules";

@JsonController("/class-topics/")
@Authorized()
export class ClassTopicController {
  @Get()
  public async list(@QueryParams() query): Promise<ApiResponse> {
    const topics = await classTopicService.list(query.page, query.per_page);

    return topics;
  }

  @Post("from/classes")
  @Validate(rules.getFromClasses)
  public async getFromClasses(@Body() body): Promise<ApiResponse> {
    return success(await classTopicService.getFromClasses(body.classes));
  }

  @Get(":id")
  public async getOne(@Param("id") id: string): Promise<ApiResponse> {
    return success(await classTopicService.get(id));
  }

  @Post()
  @Validate(rules.onCreate)
  @Authorized(Role.TEACHER)
  public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
    const klass: IClass = await classService.get(data.classId);
    checkUserOwnership(user, () => klass.teacher === user._id);

    return success(await classTopicService.create({ ...data, class: data.classId }));
  }

  @Post(":id")
  @Validate(rules.onUpdate)
  @Authorized(Role.TEACHER)
  public async update(
    @Body() data: any,
    @Param("id") id: string,
    @UserFromSession() user: IUser
  ): Promise<ApiResponse> {
    const klass: IClass = await classService.get(data.classId);
    checkUserOwnership(user, () => klass.teacher === user._id);

    return success(await classTopicService.update(id, data));
  }

  @Delete(":id")
  @Authorized(Role.TEACHER)
  public async delete(@Param("id") id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
    const topic = await classTopicService.get(id);
    const klass: IClass = await classService.get(topic.class);
    checkUserOwnership(user, () => klass.teacher === user._id);

    return success(await classTopicService.delete(id));
  }
}
