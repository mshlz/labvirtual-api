import { model } from 'mongoose'
import slugify from 'slugify'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { BaseSchema } from '../Base/BaseSchema'

export interface IPageSection {
    name: string
    description: string
    slug: string
}

const PageSectionSchema = new BaseSchema<IPageSection>({
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String,/* required: true*/ },
}, { versionKey: false, timestamps: true })

PageSectionSchema.pre('save', function (next) {
    this.slug = slugify(this.name.slice(0, 30), { lower: true })
    return next()
})
PageSectionSchema.pre('updateOne', function (next) {
    this._update.slug = slugify(this._update.name.slice(0, 30), { lower: true })
    return next()
})

PageSectionSchema.plugin(mongoosePaginator)

export const PageSection = model<IPageSection>('PageSection', PageSectionSchema)
