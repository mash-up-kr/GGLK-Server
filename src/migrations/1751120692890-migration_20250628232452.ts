import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration202506282324521751120692890
  implements MigrationInterface
{
  name = 'Migration202506282324521751120692890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evaluation" RENAME COLUMN "hashTagList" TO "hashtagList"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evaluation" RENAME COLUMN "hashtagList" TO "hashTagList"`,
    );
  }
}
