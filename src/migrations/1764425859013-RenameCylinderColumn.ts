import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameCylinderColumn1764425859013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE vehicles RENAME COLUMN "cylinder" TO "numberOfCylinders"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE vehicles RENAME COLUMN "numberOfCylinders" TO "cylinder"`);
    }

}
