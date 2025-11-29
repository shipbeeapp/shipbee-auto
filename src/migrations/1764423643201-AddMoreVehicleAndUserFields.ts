import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoreVehicleAndUserFields1764423643201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD COLUMN "companyCoordinatorName" text`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "withDriver" boolean`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "maxMileagePerMonth" int`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "vehicleType" text`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "vehicleCategory" text`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "countryOfOrigin" text`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "chassisNumber" text`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "cylinder" int`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "numberOfSeats" int`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "maxLoadCapacity" int`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "insuranceCompany" text`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "insuranceType" text`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "insuranceExpiryDate" date`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "registrationExpiryDate" date`);
        await queryRunner.query(`ALTER TABLE vehicles ADD COLUMN "environment" text`);
        await queryRunner.query(`UPDATE vehicles SET "environment" = 'test'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP COLUMN "companyCoordinatorName"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "withDriver"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "maxMileagePerMonth"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "vehicleType"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "vehicleCategory"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "countryOfOrigin"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "chassisNumber"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "cylinder"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "numberOfSeats"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "maxLoadCapacity"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "insuranceCompany"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "insuranceType"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "insuranceExpiryDate"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "registrationExpiryDate"`);
        await queryRunner.query(`ALTER TABLE vehicles DROP COLUMN "environment"`);
    }

}
