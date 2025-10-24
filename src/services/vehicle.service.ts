import { Service } from "typedi";
import { AppDataSource } from "../configs/app-data-source";
import { Vehicle } from "../models/vehicle.model";

@Service()
export default class VehicleService {
    private vehicleRepository = AppDataSource.getRepository(Vehicle);

    public async createVehicle(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
        const vehicle = this.vehicleRepository.create(vehicleData);
        return await this.vehicleRepository.save(vehicle);
    }

    public async getVehicleByPlateAndDealer(plate: string, dealerId: string): Promise<Vehicle | null> {
        return await this.vehicleRepository.findOne({ 
            where: {
                user: { id: dealerId },
                plate,
            },
        });
    }
    // public async getUserByEmail(email: string): Promise<User | null> {
    //     return await this.userRepository.findOne({ where: { email } });
    // }

    public async saveVehicle(vehicle: Vehicle): Promise<Vehicle> {
        return await this.vehicleRepository.save(vehicle);
    }
}