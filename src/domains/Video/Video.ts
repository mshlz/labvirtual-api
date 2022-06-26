import { model } from 'mongoose'
import slugify from 'slugify'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { getNanoId } from '../../utils/nanoid'
import { BaseSchema } from '../Base/BaseSchema'
import { IDiscipline } from '../Discipline/Discipline'
import { ISubject } from '../Subject/Subject'

export interface IVideo {
    name: string
    slug: string
    code: string
    icon: string
    content: string
    disciplines: string[] | IDiscipline[]
    subjects: string[] | ISubject[]
}

const VideoSchema = new BaseSchema<IVideo>({
    name: { type: String, required: true },
    icon: { type: String },
    slug: { type: String,/* required: true*/ },
    code: { type: String, default: () => getNanoId(), immutable: true },
    content: { type: String, required: true },
    disciplines: [{ type: String, ref: 'Discipline' }],
    subjects: [{ type: String, ref: 'Subject' }],
}, { versionKey: false, timestamps: true })

VideoSchema.pre('save', function (next) {
    // generate slug
    this.slug = slugify(this.name.slice(0, 30), { lower: true }).concat('-', this.code)

    return next()
})

VideoSchema.plugin(mongoosePaginator)

export const Video = model<IVideo>('Video', VideoSchema)
