import { Yup } from "../../../utils/validator/Validator";

class Rules {
    onCreate = {
        name: Yup.string().trim().min(3),
        text: Yup.string().trim(),
        type: Yup.string().trim().oneOf(['dissertative', 'single-choice', 'multiple-choice']),
        alternatives: Yup.array(),
    }

    onUpdate = {
        ...this.onCreate
    }
}

export default new Rules()