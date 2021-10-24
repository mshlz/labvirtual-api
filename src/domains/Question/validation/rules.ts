import { Yup } from '../../../utils/validator/Validator'
import { QuestionTypeArray } from '../Question'

const alternativeShape = Yup.object().shape({
    text: Yup.string().required(),
    correct: Yup.boolean()
})
class Rules {
    onCreate = {
        name: Yup.string().trim().required().min(3),
        text: Yup.string().trim(),
        type: Yup.string().trim().required().oneOf([...QuestionTypeArray]),
        alternatives: Yup.array().of(alternativeShape),
        disciplines: Yup.array().of(Yup.string().uuid()),
        subjects: Yup.array().of(Yup.string().uuid()),
    }

    onUpdate = {
        ...this.onCreate
    }

    simpleSearch = {
        query: Yup.string().trim().min(1).required(),
        skipIds: Yup.array().of(Yup.string().trim().uuid())
    }
}

export default new Rules()