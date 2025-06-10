import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '@gglk/common/entity/base.entity';
import { Picture } from '@gglk/picture/entities/picture.entity';
import { User } from '@gglk/user/entities/user.entity';

@Entity('evaluation')
export class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.evaluations)
  user: User;

  // Owner of foreign Key: Evaluation
  // 역참조 허용을 위해 Picture, Evaluation간의 상호 OneToOne
  // 참고: https://orkhan.gitbook.io/typeorm/docs/one-to-one-relations
  @OneToOne(() => Picture, (picture) => picture.evaluation, { nullable: true })
  @JoinColumn()
  picture?: Picture;
}
