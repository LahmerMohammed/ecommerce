import {MigrationInterface, QueryRunner} from "typeorm";

export class addEmailConfirmationField1628357371719 implements MigrationInterface {
    name = 'addEmailConfirmationField1628357371719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_email_confirmed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_email_confirmed"`);
    }

}
