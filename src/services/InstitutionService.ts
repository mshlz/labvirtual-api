import { Institution } from "../models/Institution";
import { BaseResourceService } from "./_BaseService";

export class InstitutionService extends BaseResourceService {
    constructor() { super(Institution) }
}
