import { Yup } from '../../../utils/validator/Validator'
import { Class } from '../../Class/Class'
import { ClassTopic } from '../../ClassTopic/ClassTopic'
import { ClassworkQuestion } from '../../ClassworkQuestion/ClassworkQuestion'
import { Question } from '../../Question/Question'

const NewQuestionsSchema = Yup.object().shape({
    questionId: Yup.string().required().uuid().exists(Question),
    value: Yup.number().required()
})

const QuestionsSchema = Yup.object().shape({
    questionId: Yup.string().required().uuid().exists(ClassworkQuestion),
    value: Yup.number().required()
})
class Rules {
    onCreate = {
        name: Yup.string().trim().required().min(3),
        description: Yup.string().trim().nullable(),
        value: Yup.number().min(1).max(100),
        dueDate: Yup.date().nullable(),
        classId: Yup.string().trim().required().uuid().exists(Class),
        topicId: Yup.string().trim().uuid().exists(ClassTopic),
        newQuestions: Yup.array().of(NewQuestionsSchema)
    }

    onUpdate = {
        ...this.onCreate,
        questions: Yup.array().of(QuestionsSchema),
        classId: undefined
    }
}

export default new Rules()