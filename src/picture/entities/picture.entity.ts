import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '@gglk/common/entity/base.entity';
import { Evaluation } from '@gglk/evaluation/entities/evaluation.entity';
import { User } from '@gglk/user/entities/user.entity';

@Entity('picture')
export class Picture extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;

  @OneToOne(() => Evaluation, (evaluation) => evaluation.picture, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  evaluation?: Evaluation;

  @ManyToOne(() => User, (user) => user.pictures)
  user: User;
}
