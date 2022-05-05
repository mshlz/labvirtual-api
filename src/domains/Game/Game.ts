import { model } from 'mongoose'
import slugify from 'slugify'
import mongoosePaginator from '../../utils/database/mongoose-paginator'
import { getNanoId } from '../../utils/nanoid'
import { BaseSchema } from '../Base/BaseSchema'
import { IDiscipline } from '../Discipline/Discipline'
import { ISubject } from '../Subject/Subject'

export interface IGame {
    name: string
    slug: string
    icon: string
    code: string
    content: string
    disciplines: string[] | IDiscipline[]
    subjects: string[] | ISubject[]
}

const GameSchema = new BaseSchema<IGame>({
    name: { type: String, required: true },
    icon: { type: String },
    slug: { type: String,/* required: true*/ },
    code: { type: String, default: () => getNanoId(), immutable: true },
    content: { type: String, required: true },
    disciplines: [{ type: String, ref: 'Discipline' }],
    subjects: [{ type: String, ref: 'Subject' }],
}, { versionKey: false, timestamps: true })

GameSchema.pre('save', function (next) {
    // generate slug
    this.slug = slugify(this.name.slice(0, 30), { lower: true }).concat('-', this.code)

    return next()
})

GameSchema.plugin(mongoosePaginator)

export const Game = model<IGame>('Game', GameSchema)
