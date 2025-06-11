import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@gglk/common/entity/base.entity';
import { Evaluation } from '@gglk/evaluation/entities/evaluation.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  joinedAt?: Date;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.user)
  evaluations: Evaluation[];

  // TODO : 추후 상의 필요
  @Column({ default: 'kakao', nullable: true })
  strategyType?: string;

  @Column({ default: false })
  providerId: string;
}
