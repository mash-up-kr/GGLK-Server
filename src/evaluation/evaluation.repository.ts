import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationRepository extends Repository<Evaluation> {
  constructor(private readonly dataSource: DataSource) {
    super(Evaluation, dataSource.createEntityManager());
  }
}
