import { MigrationInterface, QueryRunner } from "typeorm";

export class AddYearlyToRentalPeriodEnum1764424848295 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //rename existing enum type
        await queryRunner.query(`ALTER TYPE "rental_period_enum" RENAME TO "rental_period_enum_old"`);

        //create new enum type with added value
        await queryRunner.query(`CREATE TYPE "rental_period_enum" AS ENUM('daily', 'weekly', 'monthly', 'yearly')`);

        //alter column to use new enum type
        await queryRunner.query(`ALTER TABLE "listings" ALTER COLUMN "rentalPeriod" TYPE "rental_period_enum" USING "rentalPeriod"::text::"rental_period_enum"`);

        //drop old enum type
        await queryRunner.query(`DROP TYPE "rental_period_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //rename existing enum type
        await queryRunner.query(`ALTER TYPE "rental_period_enum" RENAME TO "rental_period_enum_new"`);

        //create old enum type without 'yearly'
        await queryRunner.query(`CREATE TYPE "rental_period_enum" AS ENUM('daily', 'weekly', 'monthly')`);

        //alter column to use old enum type
        await queryRunner.query(`ALTER TABLE "listings" ALTER COLUMN "rentalPeriod" TYPE "rental_period_enum" USING "rentalPeriod"::text::"rental_period_enum"`);

        //drop new enum type
        await queryRunner.query(`DROP TYPE "rental_period_enum_new"`);
    }

}
