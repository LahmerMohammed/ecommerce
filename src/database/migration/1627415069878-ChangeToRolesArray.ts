import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeToRolesArray1627415069878 implements MigrationInterface {
    name = 'ChangeToRolesArray1627415069878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."roles"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "roles" array NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."roles" AS ENUM('user', 'admin', 'super_admin')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "roles" NOT NULL DEFAULT 'user'`);
    }

}
