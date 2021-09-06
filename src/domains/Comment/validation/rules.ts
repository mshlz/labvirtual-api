import { Yup } from "../../../utils/validator/Validator";

class Rules {
    onCreate = {
        text: Yup.string().trim().min(3).max(1000).required(),
        post_uuid: Yup.string().uuid().required()
    }

    onUpdate = {
        text: Yup.string().trim().min(3).max(1000).required(),
    }
}

export default new Rules()