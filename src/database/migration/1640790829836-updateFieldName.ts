import {MigrationInterface, QueryRunner} from "typeorm";

export class updateFieldName1640790829836 implements MigrationInterface {
    name = 'updateFieldName1640790829836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f0a4405d94e74c5aee0b2a9f888"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "added_by_id" TO "created_by_id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_53345ffb00a286f308561c0d1c4" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_53345ffb00a286f308561c0d1c4"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "created_by_id" TO "added_by_id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f0a4405d94e74c5aee0b2a9f888" FOREIGN KEY ("added_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
