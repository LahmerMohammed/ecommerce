import {MigrationInterface, QueryRunner} from "typeorm";

export class init1627864784995 implements MigrationInterface {
    name = 'init1627864784995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "street" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "town" character varying NOT NULL, "zipcode" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rate" integer, "comment" text, "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "role" AS ENUM('user', 'admin', 'super_admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "phone_number" character varying, "username" character varying NOT NULL, "birthdate" date NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" "role" NOT NULL DEFAULT 'user', "address_id" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_302d96673413455481d5ff4022" UNIQUE ("address_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "added_by_id" uuid NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purshase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "unit_price" integer NOT NULL, "quntity" integer NOT NULL, "product_id" uuid NOT NULL, "user_id" uuid NOT NULL, "shippingAddressId" uuid, CONSTRAINT "REL_8bf06bf41bcc504ceef1307225" UNIQUE ("shippingAddressId"), CONSTRAINT "PK_fd62482d4dfb42126c8b8fd96c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_whishlist_product" ("userId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_92bbb88fab34be5060cd52a6468" PRIMARY KEY ("userId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b45c6f0d142354a87a4e3601de" ON "user_whishlist_product" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_be085a56496961d9bce5ecc1d7" ON "user_whishlist_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_81446f2ee100305f42645d4d6c2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_302d96673413455481d5ff4022a" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f0a4405d94e74c5aee0b2a9f888" FOREIGN KEY ("added_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purshase" ADD CONSTRAINT "FK_1f63ec41d91ae90167d9e28da6c" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purshase" ADD CONSTRAINT "FK_8cc3951c428bd57193e7011eada" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "purshase" ADD CONSTRAINT "FK_8bf06bf41bcc504ceef13072250" FOREIGN KEY ("shippingAddressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "user_whishlist_product" ADD CONSTRAINT "FK_b45c6f0d142354a87a4e3601de8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_whishlist_product" ADD CONSTRAINT "FK_be085a56496961d9bce5ecc1d75" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_whishlist_product" DROP CONSTRAINT "FK_be085a56496961d9bce5ecc1d75"`);
        await queryRunner.query(`ALTER TABLE "user_whishlist_product" DROP CONSTRAINT "FK_b45c6f0d142354a87a4e3601de8"`);
        await queryRunner.query(`ALTER TABLE "purshase" DROP CONSTRAINT "FK_8bf06bf41bcc504ceef13072250"`);
        await queryRunner.query(`ALTER TABLE "purshase" DROP CONSTRAINT "FK_8cc3951c428bd57193e7011eada"`);
        await queryRunner.query(`ALTER TABLE "purshase" DROP CONSTRAINT "FK_1f63ec41d91ae90167d9e28da6c"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f0a4405d94e74c5aee0b2a9f888"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_26b533e15b5f2334c96339a1f08"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_81446f2ee100305f42645d4d6c2"`);
        await queryRunner.query(`DROP INDEX "IDX_be085a56496961d9bce5ecc1d7"`);
        await queryRunner.query(`DROP INDEX "IDX_b45c6f0d142354a87a4e3601de"`);
        await queryRunner.query(`DROP TABLE "user_whishlist_product"`);
        await queryRunner.query(`DROP TABLE "purshase"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "role"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
