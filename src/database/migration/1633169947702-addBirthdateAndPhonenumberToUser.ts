import {MigrationInterface, QueryRunner} from "typeorm";

export class addBirthdateAndPhonenumberToUser1633169947702 implements MigrationInterface {
    name = 'addBirthdateAndPhonenumberToUser1633169947702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "birthdate" date`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phonenumber" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phonenumber"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthdate"`);
    }

}
