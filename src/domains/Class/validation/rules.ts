import { Yup } from '../../../utils/validator/Validator'
import { User } from '../../System/User/User'
import { Class } from '../Class'

class Rules {
    onCreate = {
        name: Yup.string().trim().min(3),
        discipline: Yup.string().trim().uuid()
    }

    onUpdate = {
        ...this.onCreate
    }

    onEnroll = {
        code: Yup.string().trim().required(),
    }

    onUnenroll = {
        classId: Yup.string().trim().required().uuid().exists(Class)
    }
}

export default new Rules()