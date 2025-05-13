import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Picture } from '@gglk/picture/entities/picture.entity';
import { User } from '@gglk/user/entities/user.entity';

@Entity('evaluation')
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.evaluations)
  user: User;

  @OneToOne(() => Picture)
  @JoinColumn()
  picture: Picture;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false, select: false })
  isDeleted: boolean;
}
