import { JsonController, Post, UploadedFile } from "routing-controllers";
import { Authorized } from "../../utils/auth";
import { UserFromSession } from "../../utils/decorators/UserFromSession";
import { IUser } from "../User/User";
import { ImageUploadService } from "./ImageUploadService";

@JsonController("/")
@Authorized()
export class ImageUploadController {
  @Post("upload")
  public async uploadImage(
    @UploadedFile("file-0") data,
    @UserFromSession() user: IUser
  ) {
    const result = await ImageUploadService.uploadImage(
      { filename: data.originalname, size: data.size, buffer: data.buffer },
      { user: { _id: user._id, name: user.name } }
    );

    return {
      result: [
        {
          url: result.url,
          name: data.originalname,
          size: data.size,
        },
      ],
    };
  }

  @Post("upload/2")
  public async uploadImage2(
    @UploadedFile("file") data,
    @UserFromSession() user: IUser
  ) {
    const result = await ImageUploadService.uploadImage(
      { filename: data.originalname, size: data.size, buffer: data.buffer },
      { user: { _id: user._id, name: user.name } }
    );

    return {
      name: data.originalname,
      status: "done",
      url: result.url,
      thumbUrl: result.url,
    };
  }
}
