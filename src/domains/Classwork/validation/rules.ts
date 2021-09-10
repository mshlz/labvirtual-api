import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        name: Yup.string().trim().min(3),
        description: Yup.string().trim().min(3),
        value: Yup.number().min(1).max(100),
        dueDate: Yup.date(),
        class: Yup.string().trim().uuid()
    }

    onUpdate = {
        ...this.onCreate
    }
}

export default new Rules()