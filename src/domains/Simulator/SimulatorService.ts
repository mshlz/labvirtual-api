import { Simulator } from './Simulator'
import { BaseResourceService } from '../Base/BaseService'
import { NotFoundError } from 'routing-controllers'

export class SimulatorService extends BaseResourceService {
    constructor() { super(Simulator) }

    public async list(page?: number, per_page?: number): Promise<any> {
        return super.list(page, per_page, { populate: [{ path: 'disciplines', select: 'name id' }, { path: 'subjects', select: 'name id' }] })
    }

    public async get(id: string) {
        const result = await Simulator.findOne({ _id: id }).populate('disciplines', 'name icon').lean(true).exec()

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async getByCode(code: string) {
        const result = await Simulator.findOne({ code }).populate('disciplines', 'name').lean(true).exec()

        if (!result) {
            throw new NotFoundError('Objeto não encontrado')
        }

        return result
    }

    public async getFromDisciplines(disciplines: string[]) {
        return Simulator.find({ disciplines }).lean(true)
    }

    public async getFromSubjects(subjects: string[]) {
        return Simulator.find({ subjects }).lean(true)
    }
}

export const simultatorService = new SimulatorService()
