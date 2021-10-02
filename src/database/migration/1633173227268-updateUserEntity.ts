import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserEntity1633173227268 implements MigrationInterface {
    name = 'updateUserEntity1633173227268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "street"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "town"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "zipcode"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "phonenumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "phonenumber"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "zipcode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "town" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "street" character varying NOT NULL`);
    }

}
