import { Schema, SchemaDefinition, SchemaDefinitionType, SchemaOptions } from 'mongoose'
import { v4 } from 'uuid'

export class BaseSchema<T = any> extends Schema {
    constructor(definition?: SchemaDefinition<SchemaDefinitionType<T>>, options?: SchemaOptions) {

        if (!definition['_id']) {
            definition['_id'] = {
                type: String,
                default: v4,
                immutable: true
            }
        }

        super(definition, options)

        this.set('id', false)

        this.set('toJSON', {
            virtuals: true,
            versionKey: false,
            // transform: function (doc, ret) { delete ret._id }
        })

        this.set('toObject', {
            virtuals: true,
            versionKey: false,
            // transform: function (doc, ret) { delete ret._id }
        })
    }
}