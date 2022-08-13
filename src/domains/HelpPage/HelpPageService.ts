import { NotFoundError } from "routing-controllers";
import { BaseResourceService } from "../Base/BaseService";
import { helpSectionService } from "../HelpSection/HelpSectionService";
import { HelpPage } from "./HelpPage";

export class HelpPageService extends BaseResourceService {
  constructor() {
    super(HelpPage);
  }

  public async list(page?: number, per_page?: number): Promise<any> {
    return super.list(page, per_page, {
      populate: [
        { path: "section", select: "name id" },
        { path: "author", select: "name id" },
      ],
    });
  }

  public async get(id: string) {
    const result = await HelpPage.findOne({ _id: id })
      .populate("section", "name id")
      .populate("author", "name id")
      .lean(true)
      .exec();

    if (!result) {
      throw new NotFoundError("Objeto não encontrado");
    }

    return result;
  }

  public async getByCode(code: string) {
    const result = await HelpPage.findOne({ code })
      .populate("section", "icon name")
      .populate("author", "name id")
      .lean(true)
      .exec();

    if (!result) {
      throw new NotFoundError("Objeto não encontrado");
    }

    return result;
  }

  public async getRouterInfo() {
    const pages = await HelpPage.find({})
      .select("-_id code slug name section")
      .lean(true)
      .exec();
    const sectionIds = [...new Set(pages.map((v) => v.section as string))];

    return {
      sections: await helpSectionService.getNameByIds(sectionIds),
      pages,
    };
  }

  public async getFromSections(sections: string[]) {
    return HelpPage.find({ section: { $in: sections } }).lean(true);
  }
}

export const pageService = new HelpPageService();
