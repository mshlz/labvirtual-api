import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        name: Yup.string().trim().min(3),
        class: Yup.string().trim().uuid()
    }

    onUpdate = {
        name: Yup.string().trim().min(3),
    }
}

export default new Rules()