import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAddressToAddresses1633168359118 implements MigrationInterface {
    name = 'updateAddressToAddresses1633168359118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_302d96673413455481d5ff4022"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_302d96673413455481d5ff4022" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_302d96673413455481d5ff4022a" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
