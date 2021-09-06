import { Yup } from '../../../../utils/validator/Validator'

class Rules {
    onLogin = {
        email: Yup.string().required().email(),
        password: Yup.string().required()
    }

    onRegister = {
        name: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        type: Yup.string().required().oneOf(['teacher', 'student'])
    }

    onForgotPassword = {
        email: Yup.string().required().email(),
    }

    onResetPassword = {
        token: Yup.string().required(),
        password: Yup.string().required(),
    }
}

export default new Rules()