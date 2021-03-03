import { Get, JsonController } from "routing-controllers";
import { ApiResponse } from "../interfaces/ApiResponse";

@JsonController('/')
export class DefaultController {
    @Get('health')
    public async health(): Promise<ApiResponse> {
        return {
            message: "OK"
        }
    }

}