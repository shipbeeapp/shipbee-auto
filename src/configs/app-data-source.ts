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
import {AddMoreVehicleAndUserFields1764423643201} from "../migrations/1764423643201-AddMoreVehicleAndUserFields";
import {AddYearlyToRentalPeriodEnum1764424848295} from "../migrations/1764424848295-AddYearlyToRentalPeriodEnum";
import {RenameCylinderColumn1764425859013} from "../migrations/1764425859013-RenameCylinderColumn";

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
    AddMoreVehicleAndUserFields1764423643201,
    AddYearlyToRentalPeriodEnum1764424848295,
    RenameCylinderColumn1764425859013,
  ], // ✅ Path to migrations
  ssl: false,
  synchronize: false, // Always false in production!
  logging: false,
});