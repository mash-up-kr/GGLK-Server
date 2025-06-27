import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration202506272113271751026407543
  implements MigrationInterface
{
  name = 'Migration202506272113271751026407543';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "picture" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_31ccf37c74bae202e771c0c2a38" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "evaluation" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "userId" uuid, "pictureId" integer, CONSTRAINT "REL_f75fccf117d8e991d0a34dfcb9" UNIQUE ("pictureId"), CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "name" character varying, "joinedAt" TIMESTAMP, "strategyType" character varying, "providerId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8421613dcf31260a6169128e0a8" UNIQUE ("providerId", "strategyType"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation" ADD CONSTRAINT "FK_115170ae291135522efdb1fb23c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation" ADD CONSTRAINT "FK_f75fccf117d8e991d0a34dfcb95" FOREIGN KEY ("pictureId") REFERENCES "picture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evaluation" DROP CONSTRAINT "FK_f75fccf117d8e991d0a34dfcb95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation" DROP CONSTRAINT "FK_115170ae291135522efdb1fb23c"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "evaluation"`);
    await queryRunner.query(`DROP TABLE "picture"`);
  }
}
