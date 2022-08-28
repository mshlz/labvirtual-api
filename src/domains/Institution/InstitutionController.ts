import { Body, Delete, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { Authorized, Role } from "../../utils/auth";
import { success } from "../../utils/http/responses";
import { Validate } from "../../utils/validator/Validator";
import { institutionService } from "./InstitutionService";
import rules from "./validation/rules";

@JsonController("/institutions/")
@Authorized()
export class InstitutionController {
  @Get()
  public async list(@QueryParams() query): Promise<ApiResponse> {
    const institutions = await institutionService.list(query.page, query.per_page);

    return institutions;
  }

  @Get(":id")
  public async getOne(@Param("id") id: string): Promise<ApiResponse> {
    return success(await institutionService.get(id));
  }

  @Post()
  @Validate(rules.onCreate)
  @Authorized(Role.TEACHER)
  public async create(@Body() data: any): Promise<ApiResponse> {
    return success(await institutionService.create(data));
  }

  @Post(":id")
  @Validate(rules.onUpdate)
  @Authorized(Role.TEACHER)
  public async update(@Body() data: any, @Param("id") id: string): Promise<ApiResponse> {
    return success(await institutionService.update(id, data));
  }

  @Delete(":id")
  @Authorized(Role.MODERATOR)
  public async delete(@Param("id") id: string): Promise<ApiResponse> {
    return success(await institutionService.delete(id));
  }
}
