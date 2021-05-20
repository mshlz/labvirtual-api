import { ImageLog } from "../models/ImageLog"
import axios from 'axios'
import FormData from 'form-data'
import { IMGUR_CLIENT_ID } from "../config/env"

export class ImageUploadService {

    public static async uploadImage({ filename, buffer, size }, metadata?: object) {        
        const data = new FormData()
        data.append('image', buffer)

        const response = await axios.post('https://api.imgur.com/3/image', data, {
            headers : {
                Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
                ...data.getHeaders()
            }
        })
        const result = response.data.data

        await ImageLog.create({
            original_filename: filename || 'image.png',
            size: size || 0,
            url: result.link,
            metadata
        })

        return { url: result.link, _info: result }
    }

}
