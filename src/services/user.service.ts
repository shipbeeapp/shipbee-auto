import { Service } from "typedi";
import { AppDataSource } from "../configs/app-data-source";
import { User } from "../models/user.model";

@Service()
export default class UserService {
    private userRepository = AppDataSource.getRepository(User);

    public async createUser(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    public async getUserByEmailOrPhone(email: string, phone: string): Promise<User | null> {
        return await this.userRepository.findOne({ 
            where: [ 
                {email}, 
                {phone} 
            ] 
        });
    }

    public async saveUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}