import { Yup } from '../../../utils/validator/Validator'
import { Class } from '../../Class/Class'

class Rules {
    onCreate = {
        name: Yup.string().trim().required().min(3),
        classId: Yup.string().trim().required().uuid().exists(Class)
    }

    onUpdate = {
        name: this.onCreate.name,
    }

    getFromClasses = {
        classes: Yup.array().of(Yup.string().uuid())
    }

}

export default new Rules()