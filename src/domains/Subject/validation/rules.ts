import { Yup } from '../../../utils/validator/Validator'
import { Discipline } from '../../Discipline/Discipline'

class Rules {
    onCreate = {
        name: Yup.string().trim().required().min(3),
        discipline: Yup.string().trim().required().uuid().exists(Discipline)
    }

    onUpdate = {
        ...this.onCreate
    }

    getFromDisciplines = {
        disciplines: Yup.array().of(Yup.string().uuid())
    }
}

export default new Rules()