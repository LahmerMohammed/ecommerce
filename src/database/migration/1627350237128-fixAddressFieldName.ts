import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAddressFieldName1627350237128 implements MigrationInterface {
    name = 'fixAddressFieldName1627350237128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "addressId" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271" TO "UQ_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_302d96673413455481d5ff4022a" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_302d96673413455481d5ff4022a" TO "UQ_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "address_id" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
