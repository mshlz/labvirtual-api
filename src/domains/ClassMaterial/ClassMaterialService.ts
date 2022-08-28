import { NotFoundError } from "routing-controllers";
import { BaseResourceService } from "../Base/BaseService";
import { ClassMaterial, IClassMaterial } from "./ClassMaterial";

export class ClassMaterialService extends BaseResourceService<IClassMaterial> {
  constructor() {
    super(ClassMaterial);
  }

  public async create(data: Partial<IClassMaterial>) {
    const classMaterial = await super.create({
      ...data,
      class: data.class,
      topic: data.topic,
    });

    return classMaterial;
  }

  public async get(id: string) {
    const result = await ClassMaterial.findById(id)
      .populate("author", "id name")
      .populate({
        path: "refs.subjects",
        select: "id name icon discipline",
        populate: {
          path: "discipline",
          select: "id name",
        },
      })
      .lean(true);

    if (!result) {
      throw new NotFoundError("Objeto não encontrado");
    }

    return result;
  }

  public async getFromClassTopic(topicId: string) {
    const result = await ClassMaterial.find({ topic: topicId })
      .populate("author", "id name")
      .populate("topic", "id name")
      .populate({
        path: "refs.subjects",
        select: "id name icon discipline",
        populate: {
          path: "discipline",
          select: "id name",
        },
      })
      .sort({ createdAt: "desc" })
      .lean(true);

    if (!result) {
      throw new NotFoundError("Objeto não encontrado");
    }

    return result;
  }

  public async getFromClassId(classId: string) {
    const result = await ClassMaterial.find({ class: classId })
      .populate("author", "id name")
      .populate("topic", "id name")
      .populate({
        path: "refs.subjects",
        select: "id name icon discipline",
        populate: {
          path: "discipline",
          select: "id name",
        },
      })
      .sort({ createdAt: "desc" })
      .lean(true);

    if (!result) {
      throw new NotFoundError("Objeto não encontrado");
    }

    return result;
  }
}

export const classMaterialService = new ClassMaterialService();
