import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleTypeAsArray1628215573189 implements MigrationInterface {
    name = 'RoleTypeAsArray1628215573189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."role"`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('user', 'admin', 'super_admin', 'seller')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "user_role_enum" array NOT NULL DEFAULT '{user}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'super_admin', 'seller')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "role" NOT NULL DEFAULT 'user'`);
    }

}
