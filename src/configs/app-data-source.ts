import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./environment";
import { InitialMigration1759397078556 } from "../migrations/1759397078556-InitialMigration";
import { User } from "../models/user.model";
import { Vehicle } from "../models/vehicle.model";
import { Listing } from "../models/listing.model";
import { SpareParts } from "../models/spareParts.model";
import {AddSparePartsModel1761320586689} from "../migrations/1761320586689-AddSparePartsModel";
import {MakeVehicleAndSparePartIdNullableInListing1761323697543} from "../migrations/1761323697543-MakeVehicleAndSparePartIdNullableInListing";

export const AppDataSource = new DataSource({
  type: "postgres",
  // url: env.DATABASE_URL,
  host: env.DB.HOST,
  port: Number(env.DB.PORT),
  username: env.DB.USERNAME,
  password: env.DB.PASSWORD,
  database: env.DB.DATABASE,
  entities: [
    User,
    Vehicle,
    Listing,
    SpareParts,
  ],
  migrations: [
    InitialMigration1759397078556,
    AddSparePartsModel1761320586689,
    MakeVehicleAndSparePartIdNullableInListing1761323697543,
  ], // ✅ Path to migrations
  ssl: false,
  synchronize: false, // Always false in production!
  logging: false,
});