import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./environment";
import { InitialMigration1759397078556 } from "../migrations/1759397078556-InitialMigration";
import { User } from "../models/user.model";
import { Vehicle } from "../models/vehicle.model";
import { Listing } from "../models/listing.model";

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
  ],
  migrations: [
    InitialMigration1759397078556
  ], // ✅ Path to migrations
  ssl: false,
  synchronize: false, // Always false in production!
  logging: false,
});