import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        student: Yup.string().trim().uuid(),
        class: Yup.string().trim().uuid()
    }

    onUpdate = {
        ...this.onCreate
    }
}

export default new Rules()