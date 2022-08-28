import { Roles } from "../../../utils/auth";
import { Yup } from "../../../utils/validator/Validator";
import { Discipline } from "../../Discipline/Discipline";
import { User } from "../User";

class Rules {
  onUpdate = {
    name: Yup.string().trim().min(3),
    email: Yup.string().email(),
  };

  /** ADMIN Controller */
  admin = {
    createTeacher: {
      name: Yup.string().trim().min(3),
      email: Yup.string().email(),

      disciplineId: Yup.string().required().exists(Discipline),
    },

    changePermission: {
      userId: Yup.string().required().exists(User),
      role: Yup.string().oneOf(["TEACHER", "MODERATOR"] as Roles[]),
      disciplineId: Yup.string().required().exists(Discipline),
    },
  };
}

export default new Rules();
