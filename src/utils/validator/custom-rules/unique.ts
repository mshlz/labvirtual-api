import { Model } from 'mongoose'
import { Yup } from '../Validator'

Yup.addMethod(Yup.string, 'unique', function <T extends Model<any>>(model: T, field?: keyof T, lowercase?: boolean, message?: string) {
    return this.test('unique', message || 'Já existe uma entrada para este valor.', function (value) {
        return uniqueModel(model, lowercase && value ? value.toLowerCase() : value, field)
    })
})

export async function uniqueModel<T extends Model<any>>(model: T, value: any, field?: keyof T) {
    const result = await model.count({
        [field || '_id']: value
    })

    return result === 0
}