import { Model } from 'mongoose'
import { Yup } from '../Validator'

Yup.addMethod(Yup.mixed, 'exists', function <T extends Model<any>>(model: T, field?: keyof T) {
    return this.test('exists', 'Esta entrada não foi encontrada.', function (value) {
        return existsModel(model, value, field)
    })
})

export async function existsModel<T extends Model<any>>(model: T, value: any, field?: keyof T) {
    const result = await model.count({
        [field || '_id']: value
    })

    return result > 0
}