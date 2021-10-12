import {MigrationInterface, QueryRunner} from "typeorm";

export class updateProduct1634061204888 implements MigrationInterface {
    name = 'updateProduct1634061204888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "purshase_date" TIMESTAMP NOT NULL, "subtotal_price" integer NOT NULL, "shipping_fee" integer NOT NULL, "discount" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
