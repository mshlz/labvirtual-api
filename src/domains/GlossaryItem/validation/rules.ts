import { Yup } from '../../../utils/validator/Validator'

class Rules {
    onCreate = {
        name: Yup.string().trim().min(1),
        description: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid(),
        // subject: Yup.string().notRequired().trim().uuid(),
    }

    onUpdate = {
        ...this.onCreate
    }

    getFromDisciplines = {
        disciplines: Yup.array().of(Yup.string().uuid())
    }
}

export default new Rules()