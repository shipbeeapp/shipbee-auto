import { Service } from "typedi";
import { AppDataSource } from "../configs/app-data-source";
import { SpareParts } from "../models/spareParts.model";

@Service()
export default class SparePartsService {
    private sparePartsRepository = AppDataSource.getRepository(SpareParts);

    public async createSparePart(sparePartsData: Partial<SpareParts>): Promise<SpareParts> {
        const sparePart = this.sparePartsRepository.create(sparePartsData);
        return await this.sparePartsRepository.save(sparePart);
    }

    public async getAllSpareParts(): Promise<SpareParts[]> {
        return await this.sparePartsRepository.find({ relations: ["user", "listings"] });
    }
}