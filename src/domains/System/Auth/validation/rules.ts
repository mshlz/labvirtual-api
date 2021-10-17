import { Yup } from '../../../../utils/validator/Validator'
import { User } from '../../User/User'

class Rules {
    onLogin = {
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        remember: Yup.boolean()
    }

    onRegister = {
        name: Yup.string().required(),
        email: Yup.string().required().email().unique(User, 'email', true, 'Este email já esta em uso'),
        password: Yup.string().required().min(5).max(50),
        type: Yup.string().required().oneOf(['teacher', 'student'])
    }

    onConfirmAccount = {
        user_id: Yup.string().trim().required().uuid().exists(User),
        token: Yup.string().trim().required()
    }

    onForgotPassword = {
        email: Yup.string().required().email(),
    }

    onResetPassword = {
        token: Yup.string().required(),
        password: this.onRegister.password,
        password_confirm: Yup.string().required().oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
    }
}

export default new Rules()