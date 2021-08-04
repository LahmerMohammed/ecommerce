import {MigrationInterface, QueryRunner} from "typeorm";

export class removeFields1628088445309 implements MigrationInterface {
    name = 'removeFields1628088445309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TYPE "role" RENAME TO "role_old"`);
        await queryRunner.query(`CREATE TYPE "role" AS ENUM('user', 'admin', 'super_admin', 'seller')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "role" USING "role"::"text"::"role"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "role_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "role_old" AS ENUM('user', 'admin', 'super_admin')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "role_old" USING "role"::"text"::"role_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "role"`);
        await queryRunner.query(`ALTER TYPE "role_old" RENAME TO "role"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "birthdate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstname" character varying NOT NULL`);
    }

}
