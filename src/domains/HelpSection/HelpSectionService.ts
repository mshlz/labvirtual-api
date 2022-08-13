import { HelpSection } from "./HelpSection";
import { BaseResourceService } from "../Base/BaseService";
import { NotFoundError } from "routing-controllers";

export class HelpSectionService extends BaseResourceService {
  constructor() {
    super(HelpSection);
  }

  public async list(Help?: number, per_Help?: number): Promise<any> {
    return super.list(Help, per_Help);
  }

  public async get(id: string) {
    const result = await HelpSection.findOne({ _id: id }).lean(true).exec();

    if (!result) {
      throw new NotFoundError("Objeto não encontrado");
    }

    return result;
  }

  public async getBySlug(slug: string) {
    const result = await HelpSection.findOne({ slug }).lean(true).exec();

    if (!result) {
      throw new NotFoundError("Objeto não encontrado");
    }

    return result;
  }

  public async getNameByIds(ids: string[]) {
    const result = await HelpSection.find({ _id: { $in: ids } })
      .select("name slug")
      .lean(true)
      .exec();
    return result;
  }
}

export const helpSectionService = new HelpSectionService();
