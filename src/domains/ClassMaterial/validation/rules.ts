import { Yup } from "../../../utils/validator/Validator";
import { Class } from "../../Class/Class";
import { ClassTopic } from "../../ClassTopic/ClassTopic";
import { Subject } from "../../Subject/Subject";

class Rules {
  onCreate = {
    description: Yup.string().trim().required(),
    topicId: Yup.string().trim().required().exists(ClassTopic),
    subjectIds: Yup.array().of(Yup.string().trim().required().uuid().exists(Subject)),
  };

  fromTopic = {
    topicId: Yup.string().exists(ClassTopic),
  };

  fromClass = {
    classId: Yup.string().exists(Class),
  };
}

export default new Rules();
