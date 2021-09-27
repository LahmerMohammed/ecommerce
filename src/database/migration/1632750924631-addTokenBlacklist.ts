import {MigrationInterface, QueryRunner} from "typeorm";

export class addTokenBlacklist1632750924631 implements MigrationInterface {
    name = 'addTokenBlacklist1632750924631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token_blacklist" ("token" character varying NOT NULL, CONSTRAINT "PK_8c2ca80e62a4a178870aa9e7a0e" PRIMARY KEY ("token"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "token_blacklist"`);
    }

}
