import {MigrationInterface, QueryRunner} from "typeorm";

export class addPhonNumberToUser1627666631540 implements MigrationInterface {
    name = 'addPhonNumberToUser1627666631540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_e2f86561573d340acc8b29320f9"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_fd742d0fbb47d06f78a7697d55e"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "added_by_admin_id"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_by_admin_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "added_by_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f0a4405d94e74c5aee0b2a9f888" FOREIGN KEY ("added_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f0a4405d94e74c5aee0b2a9f888"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "added_by_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updated_by_admin_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "added_by_admin_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_fd742d0fbb47d06f78a7697d55e" FOREIGN KEY ("updated_by_admin_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_e2f86561573d340acc8b29320f9" FOREIGN KEY ("added_by_admin_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
