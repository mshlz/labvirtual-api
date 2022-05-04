import { model } from 'mongoose'
import slugify from 'slugify'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { getNanoId } from '../../utils/nanoid'
import { BaseSchema } from '../Base/BaseSchema'
import { IPageSection } from '../PageSection/PageSection'
import { IUser } from '../System/User/User'

export interface IPage {
    name: string
    slug: string
    code: string
    authorName?: string
    author?: string | IUser
    section?: string | IPageSection
    content: string
}

const PageSchema = new BaseSchema<IPage>({
    name: { type: String, required: true },
    slug: { type: String,/* required: true*/ },
    code: { type: String, default: () => getNanoId(), immutable: true },
    content: { type: String, required: true },
    authorName: { type: String },
    section: { type: String, ref: 'PageSection' },
    author: { type: String, ref: 'User' },
}, { versionKey: false, timestamps: true })

PageSchema.pre('save', function (next) {
    // generate slug
    this.slug = slugify(this.name.slice(0, 30), { lower: true }).concat('-', this.code)

    return next()
})

PageSchema.plugin(mongoosePaginator)

export const Page = model<IPage>('Page', PageSchema)
