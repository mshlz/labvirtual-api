import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        name: Yup.string().trim().min(3),
        text: Yup.string().trim(),
        questions: Yup.array()
    }

    onUpdate = {
        ...this.onCreate
    }
}

export default new Rules()