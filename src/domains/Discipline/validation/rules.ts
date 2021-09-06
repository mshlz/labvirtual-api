import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        name: Yup.string().trim().min(3)
    }

    onUpdate = {
        ...this.onCreate
    }
}

export default new Rules()