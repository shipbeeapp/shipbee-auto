import { Service } from "typedi";
import { AppDataSource } from "../configs/app-data-source";
import { Listing } from "../models/listing.model";

@Service()
export default class ListingService {
    private listingRepository = AppDataSource.getRepository(Listing);

    public async createListing(listingData: Partial<Listing>): Promise<Listing> {
        console.log("Creating listing with data:", listingData.vehicle);
        const listing = await this.listingRepository.findOne({ where: { vehicle: {id: listingData.vehicle.id}, listingType: listingData.listingType, rentalPeriod: listingData.rentalPeriod } });
        console.log("Listing lookup result:", listing);
        if (listing) {
            console.log("Listing already exists for this vehicle and listing type:", listing);
            return listing;
        }
        else {
            const listing = this.listingRepository.create(listingData);
            return await this.listingRepository.save(listing);
        }
    }

    public async saveListing(listing: Listing): Promise<Listing> {
        return await this.listingRepository.save(listing);
    }
}