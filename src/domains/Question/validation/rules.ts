import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        name: Yup.string().trim().min(3),
        text: Yup.string().trim(),
        type: Yup.string().trim().oneOf(['dissertative', 'single-choice', 'multiple-choice']),
        alternatives: Yup.array(),
        disciplines: Yup.array().of(Yup.string().uuid()),
        subjects: Yup.array().of(Yup.string().uuid()),
    }

    onUpdate = {
        ...this.onCreate
    }
}

export default new Rules()