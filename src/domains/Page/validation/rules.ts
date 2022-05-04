import { Yup } from '../../../utils/validator/Validator'
import { PageSection } from '../../PageSection/PageSection'
import { User } from '../../System/User/User'

class Rules {
    onCreate = {
        name: Yup.string().trim().required().min(3),
        authorName: Yup.string().trim().required().min(3),
        content: Yup.string().required(),
        section: Yup.string().trim().uuid().exists(PageSection),
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