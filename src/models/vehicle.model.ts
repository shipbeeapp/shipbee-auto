import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./user.model";
import { Listing } from "./listing.model";
import BaseEntity from "./baseEntity";
import { VehicleCondition, FuelType, Transmission } from "../utils/enums/vehicles.enum";

@Entity("vehicles")
export class Vehicle extends BaseEntity {

  @ManyToOne(() => User, user => user.vehicles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({type: "text", nullable: false})
  make: string;

  @Column({type: "text", nullable: false})
  model: string;

  @Column({type: "text", nullable: false})
  year: number;

  @Column({type: "text", unique: true, nullable: true})
  plate: string;

  @Column({type: "text", nullable: false})
  bodyType: string;

  @Column({ type: "enum", enum: FuelType, nullable: false })
  fuelType: FuelType;

  @Column({ type: "enum", enum: Transmission, nullable: false })
  transmission: Transmission;

  @Column({ type: "int", nullable: false })
  mileage: number;

  @Column({ type: "text", nullable: false })
  color: string;

  @Column({ type: "int", nullable: false })
  engineCapacity: number; // in cc

  @Column({ type: "int", nullable: true })
  power: number; // in HP;

  @Column({type: "text", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "enum", enum: VehicleCondition })
  condition: VehicleCondition;

  @Column({type: "text", nullable: true })
  images: string; // comma-separated URLs

  @OneToMany(() => Listing, listing => listing.vehicle)
  listings: Listing[];
}