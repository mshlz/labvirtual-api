import { model } from "mongoose";
import { BaseSchema } from "../Base/BaseSchema";
import { IDiscipline } from "../Discipline/Discipline";
import { ISubject } from "../Subject/Subject";
import mongoosePaginator from "../../utils/database/mongoose-paginator";

interface ILesson {
    name: string
    code: string
    content: string
    discipline: string | IDiscipline
    subject: string | ISubject
}

const LessonSchema = new BaseSchema<ILesson>({
    name: String,
    code: String,
    content: String,
    discipline: { type: String, ref: 'Discipline' },
    subject: { type: String, ref: 'Subject' },
}, { versionKey: false, timestamps: true })

LessonSchema.plugin(mongoosePaginator)

const Lesson = model<ILesson>('Lesson', LessonSchema)

export { Lesson, ILesson };
