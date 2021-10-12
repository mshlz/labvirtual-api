import { Yup } from '../../../utils/validator/Validator'
import { Class } from '../../Class/Class'

class Rules {
    onCreate = {
        name: Yup.string().trim().required().min(3),
        class: Yup.string().trim().required().uuid().exists(Class)
    }

    onUpdate = {
        name: this.onCreate.name,
    }
}

export default new Rules()