import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { Authorized, Role } from "../../utils/auth";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { success } from "../../utils/http/responses";
import { Validate } from "../../utils/validator/Validator";
import { authService } from "../Auth/AuthService";
import { IUser } from "../User/User";
import { gameService } from "./GameService";
import rules from "./validation/rules";

@JsonController("/games/")
export class GameController {
  @Get()
  public async list(@QueryParams() query): Promise<ApiResponse> {
    const games = await gameService.list(query.page, query.per_page);

    return games;
  }

  @Get("code/:code")
  public async getByCode(@Param("code") code: string): Promise<ApiResponse> {
    return success(await gameService.getByCode(code));
  }

  @Get(":id")
  public async getOne(@Param("id") id: string): Promise<ApiResponse> {
    return success(await gameService.get(id));
  }

  @Post()
  @Validate(rules.onCreate)
  @Authorized(Role.MODERATOR)
  public async create(@Body() data: any, @UserFromSession() user: IUser): Promise<ApiResponse> {
    await authService.checkOwnCmplx(user, {
      disciplineIds: data.disciplines,
      subjectIds: data.subjects,
    });

    return success(await gameService.create(data));
  }

  @Post("from/disciplines")
  @Validate(rules.getFromDisciplines)
  public async getFromDisciplines(@Body() data: any): Promise<ApiResponse> {
    return success(await gameService.getFromDisciplines(data.disciplines));
  }

  @Post("from/subjects")
  @Validate(rules.getFromSubjects)
  public async getFromSubjects(@Body() data: any): Promise<ApiResponse> {
    return success(await gameService.getFromSubjects(data.subjects));
  }

  @Post(":id")
  @Validate(rules.onUpdate)
  @Authorized(Role.MODERATOR)
  public async update(
    @Body() data: any,
    @Param("id") id: string,
    @UserFromSession() user: IUser
  ): Promise<ApiResponse> {
    await authService.checkOwnCmplx(user, {
      disciplineIds: data.disciplines,
      subjectIds: data.subjects,
    });
    return success(await gameService.update(id, data));
  }

  @Delete(":id")
  @Authorized(Role.MODERATOR)
  public async delete(@Param("id") id: string): Promise<ApiResponse> {
    return success(await gameService.delete(id));
  }
}
