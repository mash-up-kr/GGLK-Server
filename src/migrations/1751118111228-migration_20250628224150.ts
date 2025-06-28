import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration202506282241501751118111228
  implements MigrationInterface
{
  name = 'Migration202506282241501751118111228';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evaluation" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation" ADD "nickname" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation" ADD "hashTagList" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation" ADD "totalScore" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evaluation" DROP COLUMN "totalScore"`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation" DROP COLUMN "hashTagList"`,
    );
    await queryRunner.query(`ALTER TABLE "evaluation" DROP COLUMN "nickname"`);
    await queryRunner.query(`ALTER TABLE "evaluation" DROP COLUMN "title"`);
  }
}
