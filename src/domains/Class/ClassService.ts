import { NotFoundError } from "routing-controllers";
import { BaseResourceService } from "../Base/BaseService";
import { Class } from "./Class";

export class ClassService extends BaseResourceService {
  constructor() {
    super(Class);
  }

  public async create(data: {
    name: string;
    description?: string;
    institutionId: string;
    disciplineId: string;
    teacherId: string;
  }) {
    const result = await Class.create({
      name: data.name,
      discipline: data.disciplineId,
      institution: data.institutionId,
      description: data.description,
      teacher: data.teacherId,
    });

    return result.toJSON();
  }

  public async update(id: string, data: { name: string; description?: string }) {
    const result = await Class.updateOne(
      { _id: id },
      {
        name: data.name,
        description: data.description,
      }
    );

    if (result.modifiedCount === 0) {
      throw new NotFoundError("Objeto não encontrado");
    }

    return true;
  }

  public async getPeopleFromClass(classId: string) {
    const result = await Class.findById(classId)
      .select("id teacher students name")
      .populate("teacher", "id name")
      .populate("students", "id name")
      .lean(true)
      .exec();

    return result;
  }

  public async getStudentsFromClass(classId: string) {
    const result = await Class.findById(classId)
      .select("id students")
      .populate("students", "id name")
      .lean(true)
      .exec();

    return result.students;
  }

  public async getClassesFromStudentId(userId: string) {
    const classes = await Class.find({ students: { $all: [userId] } })
      .select("_id name code teacher")
      .populate({
        path: "teacher",
        select: "_id name",
      })
      .lean()
      .exec();

    return classes;
  }

  public async getClassesFromTeacherId(userId: string) {
    const classes = await Class.find({ teacher: userId })
      .select("_id name code teacher")
      .populate({
        path: "teacher",
        select: "_id name",
      })
      .lean()
      .exec();

    return classes;
  }
}

export const classService = new ClassService();
