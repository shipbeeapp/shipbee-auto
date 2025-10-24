import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Vehicle } from "./vehicle.model";
import { ListingType, RentalPeriod } from "../utils/enums/listing.enum";
import BaseEntity from "./baseEntity";

@Entity("listings")
export class Listing extends BaseEntity {

  @ManyToOne(() => Vehicle, vehicle => vehicle.listings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "vehicleId" })
  vehicle: Vehicle;

  @Column({ type: "enum", enum: ListingType, nullable: false })
  listingType: ListingType;

  @Column("decimal", { precision: 12, scale: 2, nullable: false })
  price: number;

  @Column({ type: "enum", enum: RentalPeriod, nullable: true })
  rentalPeriod: RentalPeriod;

  @Column({ type: "boolean", default: true })
  availability: boolean;

}