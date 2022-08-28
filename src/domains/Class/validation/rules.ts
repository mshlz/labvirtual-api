import { Yup } from "../../../utils/validator/Validator";
import { Discipline } from "../../Discipline/Discipline";
import { Institution } from "../../Institution/Institution";
import { Class } from "../Class";

class Rules {
  onCreate = {
    name: Yup.string().trim().min(3),
    description: Yup.string().trim(),
    institutionId: Yup.string().required().exists(Institution),
    disciplineId: Yup.string().exists(Discipline),
  };

  onUpdate = {
    name: Yup.string().trim().min(3),
    description: Yup.string().trim(),
  };

  onEnroll = {
    code: Yup.string().trim().required(),
  };

  onUnenroll = {
    classId: Yup.string().trim().required().uuid().exists(Class),
  };
}

export default new Rules();
