import { model } from 'mongoose'
import slugify from 'slugify'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { BaseSchema } from '../Base/BaseSchema'

export interface IHelpSection {
    name: string
    icon: string
    description: string
    slug: string
}

const HelpSectionSchema = new BaseSchema<IHelpSection>({
    name: { type: String, required: true },
    icon: { type: String },
    description: { type: String },
    slug: { type: String,/* required: true*/ },
}, { versionKey: false, timestamps: true })

HelpSectionSchema.pre('save', function (next) {
    this.slug = slugify(this.name.slice(0, 30), { lower: true })
    return next()
})
HelpSectionSchema.pre('updateOne', function (next) {
    this._update.slug = slugify(this._update.name.slice(0, 30), { lower: true })
    return next()
})

HelpSectionSchema.plugin(mongoosePaginator)

export const HelpSection = model<IHelpSection>('HelpSection', HelpSectionSchema)
