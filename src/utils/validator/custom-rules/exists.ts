import { Model } from 'mongoose'
import { Yup } from '../Validator'

Yup.addMethod(Yup.string, 'exists', function <T extends Model<any>>(model: T, field?: keyof T) {
    return this.test('exists', 'Este item não foi encontrado.', function (value) {
        return existsModel(model, value, field)
    })
})

export async function existsModel<T extends Model<any>>(model: T, value: any, field?: keyof T) {
    const result = await model.count({
        [field || '_id']: value
    })

    return result > 0
}