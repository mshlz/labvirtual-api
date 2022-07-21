import { Yup } from '../../../utils/validator/Validator'
import { Classwork } from '../../Classwork/Classwork'
import { ClassworkQuestion } from '../../ClassworkQuestion/ClassworkQuestion'
import { ClassworkSubmission } from '../ClassworkSubmission'

const AnswerSchema = Yup.object().shape({
    questionId: Yup.string().required().uuid().exists(ClassworkQuestion),
    answer: Yup.lazy(val => (
        Array.isArray(val)
            ? Yup.array().of(Yup.string()).required()
            : Yup.string().required()
    ))
})

class Rules {
    onSubmitClasswork = {
        classworkId: Yup.string().trim().required().uuid().exists(Classwork),
        answers: Yup.array().of(AnswerSchema).required()
    }
    
    onGetAssignment = {
        assignmentId: Yup.string().trim().required().uuid().exists(ClassworkSubmission),
    }
}

export default new Rules()