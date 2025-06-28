import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@gglk/common/entity/base.entity';
import { Picture } from '@gglk/picture/entities/picture.entity';

@Entity('evaluation')
export class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Picture, (picture) => picture.evaluation)
  picture: Picture;

  @Column()
  title: string;

  @Column()
  nickname: string;

  @Column({ type: 'simple-array' })
  hashTagList: string[];

  @Column()
  totalScore: number;
}
