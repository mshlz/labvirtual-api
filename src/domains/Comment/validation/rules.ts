import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        text: Yup.string().trim().min(3).max(1000).required(),
        postId: Yup.string().uuid().required()
    }

    onUpdate = {
        text: this.onCreate.text,
    }
}

export default new Rules()