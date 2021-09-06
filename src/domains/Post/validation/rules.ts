import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        text: Yup.string().trim().max(5000).required(),
        class_uuid: Yup.string().trim().uuid().required(),
    }

    onUpdate = {
        text: this.onCreate.text
    }
}

export default new Rules()