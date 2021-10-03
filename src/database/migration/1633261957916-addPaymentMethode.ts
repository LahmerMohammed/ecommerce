import {MigrationInterface, QueryRunner} from "typeorm";

export class addPaymentMethode1633261957916 implements MigrationInterface {
    name = 'addPaymentMethode1633261957916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment-methode" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "email" character varying, "card_number" character varying, "name" character varying NOT NULL, "exp_date" date, "cvc" character varying, CONSTRAINT "PK_511b7e9b1940587b88a4761428e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payment-methode"`);
    }

}
