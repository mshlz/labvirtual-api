import * as Yup from 'yup'
import { ptForm } from 'yup-locale-pt'
import { ValidationError } from '../http/responses'
Yup.setLocale(ptForm)
export { Yup }

export const Validate = (rules) => {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value

        descriptor.value = async (data, ...args) => {
            try {
                await Yup.object(rules)
                    .validate(data, { abortEarly: false })
            }
            catch (err) {
                const validationErrors = {}
                if (err instanceof Yup.ValidationError) {
                    err.inner.forEach(err => {
                        validationErrors[err.path] = err.message
                    })

                    throw new ValidationError(validationErrors)
                }
                throw err
            }
            return original.call(this, data, ...args)
        }


    }
}