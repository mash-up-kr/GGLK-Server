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

  @OneToOne(() => Picture)
  @JoinColumn()
  picture: Picture;
}
