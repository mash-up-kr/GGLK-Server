import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration202505152053021747309983142
  implements MigrationInterface
{
  name = 'Migration202505152053021747309983142';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "picture" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "evaluation" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "picture" DROP COLUMN "updatedAt"`);
  }
}
