import {MigrationInterface, QueryRunner} from "typeorm";

export class addProductCategory1628971145411 implements MigrationInterface {
    name = 'addProductCategory1628971145411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "product_category_enum" AS ENUM('sport', 'health', 'home', 'children', 'other', 'animals', 'food', 'to_be_categorized')`);
        await queryRunner.query(`ALTER TABLE "product" ADD "category" "product_category_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "product_category_enum"`);
    }

}
