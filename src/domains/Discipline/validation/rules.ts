import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        name: Yup.string().trim().required().min(3),
        icon: Yup.string()
    }

    onUpdate = {
        ...this.onCreate
    }
}

export default new Rules()