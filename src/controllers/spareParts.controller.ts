import { Router, Request, Response } from "express";
import { Container } from "typedi";
import UserService from "../services/user.service";
import ListingService from "../services/listing.service";
import SparePartsService from "../services/spareParts.service";


export class SparePartsController {
  public router: Router = Router();
  private userService = Container.get(UserService);
  private sparePartService = Container.get(SparePartsService);
  private listingService = Container.get(ListingService);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/spare-parts", this.getAllSpareParts.bind(this));
        // Additional routes for creating, updating, and deleting vehicles can be added here
    }

    private async getAllSpareParts(req: Request, res: Response) {
        try {
            const spareParts = await this.sparePartService.getAllSpareParts();
            res.status(200).json(spareParts);
        } catch (error) {
            res.status(500).json({ message: "Error fetching vehicles", error });
        }
    }
}

