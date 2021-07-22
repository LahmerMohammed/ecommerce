import {MigrationInterface, QueryRunner} from "typeorm";

export class init1626930284588 implements MigrationInterface {
    name = 'init1626930284588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "roles" AS ENUM('user', 'admin', 'super_admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "username" character varying NOT NULL, "birthdate" date NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" "roles" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "added_by_admin_id" character varying NOT NULL, "addedByAdminId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_whishlist_product" ("userId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_92bbb88fab34be5060cd52a6468" PRIMARY KEY ("userId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b45c6f0d142354a87a4e3601de" ON "user_whishlist_product" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_be085a56496961d9bce5ecc1d7" ON "user_whishlist_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_7f0e8a057c9c5fed6754a625d6c" FOREIGN KEY ("addedByAdminId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_whishlist_product" ADD CONSTRAINT "FK_b45c6f0d142354a87a4e3601de8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_whishlist_product" ADD CONSTRAINT "FK_be085a56496961d9bce5ecc1d75" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_whishlist_product" DROP CONSTRAINT "FK_be085a56496961d9bce5ecc1d75"`);
        await queryRunner.query(`ALTER TABLE "user_whishlist_product" DROP CONSTRAINT "FK_b45c6f0d142354a87a4e3601de8"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_7f0e8a057c9c5fed6754a625d6c"`);
        await queryRunner.query(`DROP INDEX "IDX_be085a56496961d9bce5ecc1d7"`);
        await queryRunner.query(`DROP INDEX "IDX_b45c6f0d142354a87a4e3601de"`);
        await queryRunner.query(`DROP TABLE "user_whishlist_product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "roles"`);
    }

}
