import { Yup } from '../../../../utils/validator/Validator'

class Rules {
    onUpdate = {
        name: Yup.string().trim().min(3),
        email: Yup.string().email()
    }
}

export default new Rules()