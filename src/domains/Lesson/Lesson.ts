import { model } from 'mongoose'
import slugify from 'slugify'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { getNanoId } from '../../utils/nanoid'
import { BaseSchema } from '../Base/BaseSchema'
import { IDiscipline } from '../Discipline/Discipline'
import { ISubject } from '../Subject/Subject'

export interface ILesson {
    name: string
    slug: string
    code: string
    content: string
    discipline: string | IDiscipline
    subject: string | ISubject
}

const LessonSchema = new BaseSchema<ILesson>({
    name: { type: String, required: true },
    slug: { type: String,/* required: true*/ },
    code: { type: String, default: () => getNanoId(), immutable: true },
    content: { type: String, required: true },
    discipline: { type: String, ref: 'Discipline', required: true },
    subject: { type: String, ref: 'Subject', required: true },
}, { versionKey: false, timestamps: true })

LessonSchema.pre('save', function (next) {
    // generate slug
    this.slug = slugify(this.name.slice(0, 30), { lower: true }).concat('-', this.code)

    return next()
})

LessonSchema.plugin(mongoosePaginator)

export const Lesson = model<ILesson>('Lesson', LessonSchema)
