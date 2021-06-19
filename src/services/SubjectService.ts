import { Subject } from "../models/Subject"
import { BaseResourceService } from "./_BaseService"

export class SubjectService extends BaseResourceService {
    constructor() { super(Subject) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page, { populate: [{ path: 'discipline', select: 'name id'}] })
    }

    public async getFromDiscipline(discipline_id: string): Promise<any> {
        const result = await Subject.find({ discipline: discipline_id as any }).exec()
        return result?.map(e => e.toJSON())
    }

}
