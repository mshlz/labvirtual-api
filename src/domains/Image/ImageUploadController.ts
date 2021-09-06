import { JsonController, Post, UploadedFile } from 'routing-controllers'
import { ImageUploadService } from './ImageUploadService'

@JsonController('/')
export class ImageUploadController {
    @Post('upload')
    public async uploadImage(@UploadedFile('file-0') data) {
        
        const result = await ImageUploadService.uploadImage({ filename: data.originalname, size: data.size, buffer: data.buffer })
        
        return {
            result: [{
                url: result.url,
                name: data.originalname,
                size: data.size
            }]
        }
    }

}