import { Model } from 'mongoose';
import { StringSchema } from 'yup'

declare module 'yup' {
    interface StringSchema {
        exists(model: typeof Model, field?: string): StringSchema
    }
}