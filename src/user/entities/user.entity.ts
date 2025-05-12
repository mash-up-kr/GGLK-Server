import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Evaluation } from '@gglk/evaluations/entities/evaluation.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  joinedAt: Date | null;

  @Column({ default: false, select: false })
  isDeleted: boolean;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.user)
  evaluations: Evaluation[];
}
