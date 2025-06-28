import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration202506282222131751116934430
  implements MigrationInterface
{
  name = 'Migration202506282222131751116934430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "name" character varying, "joinedAt" TIMESTAMP, "strategyType" character varying, "providerId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8421613dcf31260a6169128e0a8" UNIQUE ("providerId", "strategyType"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "picture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, "evaluationId" integer, "userId" uuid, CONSTRAINT "REL_d1b04f1bca5ad6f1e8e8b32433" UNIQUE ("evaluationId"), CONSTRAINT "PK_31ccf37c74bae202e771c0c2a38" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "evaluation" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "picture" ADD CONSTRAINT "FK_d1b04f1bca5ad6f1e8e8b324334" FOREIGN KEY ("evaluationId") REFERENCES "evaluation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "picture" ADD CONSTRAINT "FK_4d301575fea97d316884209fec6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "picture" DROP CONSTRAINT "FK_4d301575fea97d316884209fec6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "picture" DROP CONSTRAINT "FK_d1b04f1bca5ad6f1e8e8b324334"`,
    );
    await queryRunner.query(`DROP TABLE "evaluation"`);
    await queryRunner.query(`DROP TABLE "picture"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
