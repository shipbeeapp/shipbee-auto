import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeVehicleAndSparePartIdNullableInListing1761323697543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //add sparePartId to listings table and make both vehicleId and sparePartId nullable
        await queryRunner.query(`ALTER TABLE "listings" ADD COLUMN "sparePartId" uuid REFERENCES "spare_parts"(id) ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "listings" ALTER COLUMN "vehicleId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "listings" ALTER COLUMN "sparePartId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listings" ALTER COLUMN "vehicleId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "listings" ALTER COLUMN "sparePartId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "listings" DROP COLUMN "sparePartId"`);
    }

}
