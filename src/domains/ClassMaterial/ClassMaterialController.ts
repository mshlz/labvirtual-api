import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { Authorized, Role } from "../../utils/auth";
import { checkUserOwnership } from "../../utils/auth/utils";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { success } from "../../utils/http/responses";
import { Validate } from "../../utils/validator/Validator";
import { IClass } from "../Class/Class";
import { classService } from "../Class/ClassService";
import { IClassTopic } from "../ClassTopic/ClassTopic";
import { classTopicService } from "../ClassTopic/ClassTopicService";
import { IUser } from "../User/User";
import { classMaterialService } from "./ClassMaterialService";
import rules from "./validation/rules";

@JsonController("/class-materials/")
@Authorized()
export class ClassworkController {
  @Get()
  public async list(@QueryParams() query): Promise<ApiResponse> {
    const result = await classMaterialService.list(query.page, query.per_page);
    return result;
  }

  @Post("from/class")
  @Validate(rules.fromClass)
  public async getFromClass(@Body() data, @UserFromSession() user: IUser): Promise<ApiResponse> {
    return success(await classMaterialService.getFromClassId(data.classId));
  }

  @Post("from/class-topic")
  @Validate(rules.fromTopic)
  public async getFromClassTopic(@Body() data, @UserFromSession() user: IUser): Promise<ApiResponse> {
    return success(await classMaterialService.getFromClassTopic(data.classId));
  }

  @Get(":id")
  public async getOne(@Param("id") id: string): Promise<ApiResponse> {
    return success(await classMaterialService.get(id));
  }

  @Post()
  @Validate(rules.onCreate)
  @Authorized(Role.TEACHER)
  public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
    const topic: IClassTopic = await classTopicService.get(data.topicId);
    const klass: IClass = await classService.get(topic.class.toString());
    checkUserOwnership(user, () => klass.teacher === user._id);

    return success(
      await classMaterialService.create({
        description: data.description,
        refs: {
          subjects: data.subjectIds,
        },
        topic: topic._id,
        class: topic.class,
        author: user._id,
      })
    );
  }

  @Delete(":id")
  @Authorized(Role.TEACHER)
  public async delete(@Param("id") id: string, @UserFromSession() user: IUser): Promise<ApiResponse> {
    const material = await classMaterialService.get(id);
    checkUserOwnership(user, () => material.author['_id'] === user._id);
    return success(await classMaterialService.delete(id));
  }
}
