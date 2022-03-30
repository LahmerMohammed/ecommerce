import {MigrationInterface, QueryRunner} from "typeorm";

export class updateWhishList1640129464038 implements MigrationInterface {
    name = 'updateWhishList1640129464038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "sale_price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "regular_price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "stock" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "tags" character varying array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "regular_price"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "sale_price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer NOT NULL`);
    }

}
