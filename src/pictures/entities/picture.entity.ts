import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Evaluation } from '@gglk/evaluations/entities/evaluation.entity';

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Evaluation)
  @JoinColumn({ name: 'evaluationId' })
  evaluation: Evaluation;

  @Column()
  evaluationId: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false, select: false })
  isDeleted: boolean;
}
