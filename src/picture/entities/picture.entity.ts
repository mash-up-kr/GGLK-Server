import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@gglk/common/entity/base.entity';
import { Evaluation } from '@gglk/evaluation/entities/evaluation.entity';

@Entity('picture')
export class Picture extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @OneToOne(() => Evaluation, (evaluation) => evaluation.picture, {
    nullable: true,
  })
  evaluation?: Evaluation;
}
