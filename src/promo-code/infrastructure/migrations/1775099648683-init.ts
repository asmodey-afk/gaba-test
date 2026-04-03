import {MigrationInterface, QueryRunner} from 'typeorm';

export class Init1775099648683 implements MigrationInterface {
    name = 'Init1775099648683';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "promo_codes" (
                "id"               SERIAL                   NOT NULL,
                "code"             character varying(64)    NOT NULL,
                "discount"         smallint                 NOT NULL,
                "activation_limit" integer                  NOT NULL,
                "expires_at"       TIMESTAMP WITH TIME ZONE NOT NULL,
                "created_at"       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at"       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_c7b4f01710fda5afa056a2b4a35" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_2f096c406a9d9d5b8ce204190c" ON "promo_codes" ("code")
        `);

        await queryRunner.query(`
            CREATE TABLE "activations" (
                "id"            SERIAL                   NOT NULL,
                "promo_code_id" integer                  NOT NULL,
                "email"         character varying(255)   NOT NULL,
                "activated_at"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_db9ffdd659f4ac699248030b596" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_activations_promo_code_email" ON "activations" ("promo_code_id", "email")
        `);

        await queryRunner.query(`
            ALTER TABLE "activations"
                ADD CONSTRAINT "FK_ee1e3b5de9e79d35880669655db"
                FOREIGN KEY ("promo_code_id")
                REFERENCES "promo_codes" ("id")
                ON DELETE CASCADE
                ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "activations" DROP CONSTRAINT "FK_ee1e3b5de9e79d35880669655db"`,
        );
        await queryRunner.query(`DROP INDEX "public"."UQ_activations_promo_code_email"`);
        await queryRunner.query(`DROP TABLE "activations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f096c406a9d9d5b8ce204190c"`);
        await queryRunner.query(`DROP TABLE "promo_codes"`);
    }
}
