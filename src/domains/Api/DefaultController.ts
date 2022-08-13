import { Get, JsonController } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";
import { getNanoIdAsync } from "../../utils/nanoid";

@JsonController("/")
export class DefaultController {
  @Get("health")
  public async health(): Promise<ApiResponse> {
    return {
      message: "OK",
      data: {
        rd: await getNanoIdAsync(),
        version: "1",
      },
    };
  }
}
