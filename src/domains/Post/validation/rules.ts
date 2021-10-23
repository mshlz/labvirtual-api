import { Yup } from '../../../utils/validator/Validator'
import { Class } from '../../Class/Class'

class Rules {
    onCreate = {
        text: Yup.string().trim().max(5000).required(),
        classId: Yup.string().trim().uuid().required(),
    }

    onUpdate = {
        text: this.onCreate.text
    }
    
    getFromClass = {
        classId: Yup.string().required().uuid().exists(Class)
    }
}

export default new Rules()