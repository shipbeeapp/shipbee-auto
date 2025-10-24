import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeVehicleAndSparePartIdNullableInListing1761323697543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listings" ALTER COLUMN "vehicleId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "listings" ALTER COLUMN "sparePartId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listings" ALTER COLUMN "vehicleId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "listings" ALTER COLUMN "sparePartId" SET NOT NULL`);
    }

}
