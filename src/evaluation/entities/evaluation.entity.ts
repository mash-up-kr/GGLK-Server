import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@gglk/user/entities/user.entity';

@Entity('evaluation')
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.evaluations)
  user: User;

  @Column()
  pictureId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false, select: false })
  isDeleted: boolean;
}
