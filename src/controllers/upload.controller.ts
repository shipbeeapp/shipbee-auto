import { Router, Request, Response, NextFunction } from 'express';
import multer from "multer";
import * as XLSX from "xlsx";
import { Container } from 'typedi';
import UserService from '../services/user.service';
import { UserType } from '../utils/enums/userType.enum';
import VehicleService from '../services/vehicle.service';
import ListingService from '../services/listing.service';
import { ListingType, RentalPeriod } from '../utils/enums/listing.enum';

const upload = multer({ dest: "uploads/" });

export class UploadController {
  public router: Router = Router();
  private userService = Container.get(UserService);
  private vehicleService = Container.get(VehicleService);
  private listingService = Container.get(ListingService);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/upload/dealer-excel", upload.single("file"), this.uploadDealerData.bind(this));
        // Additional routes for creating, updating, and deleting vehicles can be added here
    }

    private async uploadDealerData(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }
            // Read workbook
            const workbook = XLSX.readFile(req.file.path);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            if (rows.length < 4) {
              return res.status(400).json({ error: "Invalid Excel format" });
            }
        
            // Dealer info (first 2 rows)
            const dealerHeaders = rows[0] as string[];
            console.log("Dealer Headers:", dealerHeaders);
            const dealerValues = rows[1] as string[];
            console.log("Dealer Values:", dealerValues);
            const dealerInfo: Record<string, string> = {};
            dealerHeaders.forEach((header, idx) => {
              dealerInfo[header] = dealerValues[idx];
            });
        
            if (!dealerInfo.Email) {
              return res.status(400).json({ error: "Dealer Email is required" });
            }
            console.log("Dealer Info:", dealerInfo);
            let dealer = await this.userService.getUserByEmailOrPhone(dealerInfo.Email, dealerInfo.Phone);
            if (!dealer) {
                dealer = await this.userService.createUser({
                    name: dealerInfo["Dealer Name"] || "Unknown Dealer",
                    email: dealerInfo.Email,
                    phone: dealerInfo.Phone || "",
                    userType: UserType.DEALER
                });
                await this.userService.saveUser(dealer);
                console.log("Created new dealer:", dealer);
            }
            const vehicleHeaders = rows[3] as string[];
            console.log("Vehicle Headers:", vehicleHeaders);

            const vehicles = rows.slice(4);
            console.log("vehicles:", vehicles);
            for (const vehicleRow of vehicles) {
                console.log("Vehicle Row:", vehicleRow);
                const vehicleData: Record<string, any> = {};
                vehicleHeaders.forEach((header, idx) => {
                    vehicleData[header] = vehicleRow[idx];
                });
                console.log("Processing Vehicle Data:", vehicleData);
                let vehicle;
                if (vehicleData["Plate Number"]) {
                    vehicle = await this.vehicleService.getVehicleByPlateAndDealer(vehicleData["Plate Number"], dealer.id);
                }
                if (vehicle) {
                    console.log(`Vehicle with plate ${vehicleData["Plate Number"]} already exists for this dealer, skipping.`);
                }
                else {
                    vehicle = await this.vehicleService.createVehicle({
                        make: vehicleData.Make,
                        model: vehicleData.Model,
                        year: vehicleData.Year ,
                        plate: vehicleData.Condition === "used" ? vehicleData["Plate Number"] || null : null, // ✅,
                        bodyType: vehicleData["Body Type"],
                        fuelType: vehicleData["Fuel Type"],
                        transmission: vehicleData.Transmission,
                        mileage: vehicleData.Mileage,
                        color: vehicleData.Color,
                        engineCapacity: vehicleData["Engine Capacity"],
                        power: vehicleData.Power || null,
                        title: vehicleData.Title || null,
                        description: vehicleData.Description || null,
                        condition: vehicleData.Condition,
                        user: dealer
                    });
                    console.log("Created new vehicle:", vehicle);
                    await this.vehicleService.saveVehicle(vehicle);
                }

                    if (vehicleData["Sale Price"]) {
                      const listing = await this.listingService.createListing({
                        vehicle,
                        listingType: ListingType.SALE,
                        price: vehicleData["Sale Price"],
                      });
                      console.log("Created sale listing for vehicle:", vehicle.id);
                      await this.listingService.saveListing(listing);
                    }

                    if (vehicleData["Daily Rent"]) {
                      const listing = await this.listingService.createListing({
                        vehicle,
                        listingType: ListingType.RENT,
                        rentalPeriod: RentalPeriod.DAILY,
                        price: vehicleData["Daily Rent"],
                        availability: true,
                      });
                        console.log("Created daily rent listing for vehicle:", vehicle.id);
                        await this.listingService.saveListing(listing);
                    }
                
                    if (vehicleData["Weekly Rent"]) {
                      const listing = await this.listingService.createListing({
                        vehicle,
                        listingType: ListingType.RENT,
                        rentalPeriod: RentalPeriod.WEEKLY,
                        price: vehicleData["Weekly Rent"],
                        availability: true,
                      });
                        console.log("Created weekly rent listing for vehicle:", vehicle.id);
                        await this.listingService.saveListing(listing);
                    }
                
                    if (vehicleData["Monthly Rent"]) {
                      const listing = await this.listingService.createListing({
                        vehicle,
                        listingType: ListingType.RENT,
                        price: vehicleData["Monthly Rent"],
                        rentalPeriod: RentalPeriod.MONTHLY,
                        availability: true,
                      });
                        console.log("Created monthly rent listing for vehicle:", vehicle.id);
                        await this.listingService.saveListing(listing);
                    }
            }
    }   catch (error) {
            console.error("Error processing file:", error);
            next(error);
        }
        return res.status(200).json({ message: "File processed successfully" })
    };
}