import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1759397078556 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_type_enum" AS ENUM('dealer', 'individual', 'buyer')`);
        
        await queryRunner.query(`
            CREATE TABLE users (
               "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT,
                phone TEXT,
                "userType" user_type_enum NOT NULL
            );
        `);

        await queryRunner.query(`CREATE TYPE "vehicle_condition_enum" AS ENUM('new', 'used')`);
        await queryRunner.query(`CREATE TYPE "fuel_type_enum" AS ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid')`);
        await queryRunner.query(`CREATE TYPE "transmission_enum" AS ENUM('Manual', 'Automatic', 'CVT', 'DCT')`);

        await queryRunner.query(`
            CREATE TABLE vehicles (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "userId" uuid REFERENCES users(id) ON DELETE CASCADE,
                make TEXT NOT NULL,
                model TEXT NOT NULL,
                year TEXT NOT NULL,
                plate TEXT UNIQUE,
                "bodyType" TEXT NOT NULL,
                "fuelType" fuel_type_enum NOT NULL,
                transmission transmission_enum NOT NULL,
                mileage INT NOT NULL,
                color TEXT NOT NULL,
                "engineCapacity" INT NOT NULL,
                power INT,
                title TEXT,
                description TEXT,
                condition vehicle_condition_enum NOT NULL,
                images TEXT
            );
        `);
        await queryRunner.query(`CREATE TYPE "listing_type_enum" AS ENUM('sale', 'rent')`);
        await queryRunner.query(`CREATE TYPE "rental_period_enum" AS ENUM('daily', 'weekly', 'monthly')`);

        await queryRunner.query(`
            CREATE TABLE listings (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "vehicleId" uuid REFERENCES vehicles(id) ON DELETE CASCADE,
                "listingType" listing_type_enum NOT NULL,
                price DECIMAL(12,2) NOT NULL,
                "rentalPeriod" rental_period_enum,
                availability BOOLEAN DEFAULT true
            );
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE listings`);
        await queryRunner.query(`DROP TYPE "listing_type_enum"`);
        await queryRunner.query(`DROP TYPE "rental_period_enum"`);
        await queryRunner.query(`DROP TABLE vehicles`);
        await queryRunner.query(`DROP TYPE "vehicle_condition_enum"`);
        await queryRunner.query(`DROP TYPE "fuel_type_enum"`);
        await queryRunner.query(`DROP TYPE "transmission_enum"`);
        await queryRunner.query(`DROP TABLE users`);
        await queryRunner.query(`DROP TYPE "user_type_enum"`);
    }

}
