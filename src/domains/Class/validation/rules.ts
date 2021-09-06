import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        name: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid()
    }

    onUpdate = {
        ...this.onCreate
    }
}

export default new Rules()