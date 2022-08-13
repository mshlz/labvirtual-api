import { Yup } from "../../../utils/validator/Validator";
import { Discipline } from "../../Discipline/Discipline";
import { PageSection } from "../../PageSection/PageSection";
import { Subject } from "../../Subject/Subject";

class Rules {
  onCreate = {
    name: Yup.string().trim().required().min(3),
    content: Yup.string().required(),
    section: Yup.string().trim().required().uuid().exists(PageSection),
    disciplines: Yup.array().of(
      Yup.string().trim().required().uuid().exists(Discipline)
    ),
    subjects: Yup.array().of(
      Yup.string().trim().required().uuid().exists(Subject)
    ),
  };

  onUpdate = {
    ...this.onCreate,
  };

  getFromDisciplines = {
    disciplines: Yup.array().of(Yup.string().uuid()),
  };

  getFromSubjects = {
    subjects: Yup.array().of(Yup.string().uuid()),
  };
}

export default new Rules();
