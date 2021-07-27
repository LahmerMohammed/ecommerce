import {MigrationInterface, QueryRunner} from "typeorm";

export class fixManyToOneRelation1627349652088 implements MigrationInterface {
    name = 'fixManyToOneRelation1627349652088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_7f0e8a057c9c5fed6754a625d6c"`);
        await queryRunner.query(`CREATE TABLE "purshase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "unit_price" integer NOT NULL, "quntity" integer NOT NULL, "product_id" uuid NOT NULL, "user_id" uuid NOT NULL, "shippingAddressId" uuid, CONSTRAINT "REL_8bf06bf41bcc504ceef1307225" UNIQUE ("shippingAddressId"), CONSTRAINT "PK_fd62482d4dfb42126c8b8fd96c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "addedByAdminId"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_81446f2ee100305f42645d4d6c2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_e2f86561573d340acc8b29320f9" FOREIGN KEY ("added_by_admin_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purshase" ADD CONSTRAINT "FK_1f63ec41d91ae90167d9e28da6c" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purshase" ADD CONSTRAINT "FK_8cc3951c428bd57193e7011eada" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purshase" ADD CONSTRAINT "FK_8bf06bf41bcc504ceef13072250" FOREIGN KEY ("shippingAddressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purshase" DROP CONSTRAINT "FK_8bf06bf41bcc504ceef13072250"`);
        await queryRunner.query(`ALTER TABLE "purshase" DROP CONSTRAINT "FK_8cc3951c428bd57193e7011eada"`);
        await queryRunner.query(`ALTER TABLE "purshase" DROP CONSTRAINT "FK_1f63ec41d91ae90167d9e28da6c"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_e2f86561573d340acc8b29320f9"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_26b533e15b5f2334c96339a1f08"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_81446f2ee100305f42645d4d6c2"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "addedByAdminId" uuid`);
        await queryRunner.query(`ALTER TABLE "review" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "review" ADD "userId" uuid`);
        await queryRunner.query(`DROP TABLE "purshase"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_7f0e8a057c9c5fed6754a625d6c" FOREIGN KEY ("addedByAdminId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
