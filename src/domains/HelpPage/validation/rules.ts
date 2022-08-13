import { Yup } from '../../../utils/validator/Validator'
import { HelpSection } from '../../HelpSection/HelpSection'
import { User } from '../../User/User'

class Rules {
    onCreate = {
        name: Yup.string().trim().required().min(3),
        content: Yup.string().required(),
        section: Yup.string().trim().uuid().exists(HelpSection),
        author: Yup.string().trim().uuid().exists(User),
    }

    onUpdate = {
        ...this.onCreate
    }

    getFromSections = {
        sections: Yup.array().of(Yup.string().uuid())
    }
}

export default new Rules()