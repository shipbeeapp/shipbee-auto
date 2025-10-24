import { Router, Request, Response } from "express";
import { Container } from "typedi";
import VehicleService from "../services/vehicle.service";
import UserService from "../services/user.service";
import ListingService from "../services/listing.service";


export class VehicleController {
  public router: Router = Router();
  private userService = Container.get(UserService);
  private vehicleService = Container.get(VehicleService);
  private listingService = Container.get(ListingService);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/vehicles", this.getAllVehicles.bind(this));
        // Additional routes for creating, updating, and deleting vehicles can be added here
    }

    private async getAllVehicles(req: Request, res: Response) {
        try {
            const vehicles = await this.vehicleService.getAllVehicles();
            res.status(200).json(vehicles);
        } catch (error) {
            res.status(500).json({ message: "Error fetching vehicles", error });
        }
    }
}

