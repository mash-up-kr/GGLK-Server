import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationRepository extends Repository<Evaluation> {
  constructor(private readonly dataSource: DataSource) {
    super(Evaluation, dataSource.createEntityManager());
  }

  findByIdWithConvertedUrl(id: number, oldPattern: string, newPattern: string) {
    return this.createQueryBuilder('evaluation')
      .leftJoinAndSelect('evaluation.picture', 'picture')
      .addSelect(
        'REGEXP_REPLACE(picture.url, :oldPattern, :newPattern)',
        'picture_url',
      )
      .where('evaluation.id = :id', {
        id,
        oldPattern,
        newPattern,
      })
      .getOne();
  }
}
