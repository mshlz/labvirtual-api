import { model } from 'mongoose'
import slugify from 'slugify'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { getNanoId } from '../../utils/nanoid'
import { BaseSchema } from '../Base/BaseSchema'
import { IPageSection } from '../PageSection/PageSection'
import { IUser } from '../User/User'

export interface IHelpPage {
    name: string
    slug: string
    code: string
    author?: string | IUser
    section?: string | IPageSection
    content: string
}

const HelpSchema = new BaseSchema<IHelpPage>({
    name: { type: String, required: true },
    slug: { type: String,/* required: true*/ },
    code: { type: String, default: () => getNanoId(), immutable: true },
    content: { type: String, required: true },
    section: { type: String, ref: 'HelpSection' },
    author: { type: String, ref: 'User' },
}, { versionKey: false, timestamps: true })

HelpSchema.pre('save', function (next) {
    // generate slug
    this.slug = slugify(this.name.slice(0, 30), { lower: true }).concat('-', this.code)

    return next()
})

HelpSchema.plugin(mongoosePaginator)

export const HelpPage = model<IHelpPage>('HelpPage', HelpSchema)
