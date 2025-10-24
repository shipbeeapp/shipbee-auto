import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSparePartsModel1761320586689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "spare_parts" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "userId" uuid REFERENCES users(id) ON DELETE CASCADE,
                "brand" text,
                "models" jsonb,
                "partCategory" text,
                "preferredOEM" text,
                "alternativeOEMs" text,
                "recommendChannels" text,
                "priority" text,
                "notes" text,
                "quantity" integer,
                "leadTime" text,
                "partNumber" text,
                "images" text,
                CONSTRAINT "PK_spare_parts_id" PRIMARY KEY ("id"),
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "spare_parts"`);
    }

}
