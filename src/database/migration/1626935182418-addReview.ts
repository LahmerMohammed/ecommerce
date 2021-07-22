import {MigrationInterface, QueryRunner} from "typeorm";

export class addReview1626935182418 implements MigrationInterface {
    name = 'addReview1626935182418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rate" integer, "comment" text, "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, "userId" uuid, "productId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "added_by_admin_id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "added_by_admin_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "added_by_admin_id"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "added_by_admin_id" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
