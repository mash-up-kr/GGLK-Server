import { IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from '@gglk/common/entity/base.entity';
import { Picture } from '@gglk/picture/entities/picture.entity';

@Entity('user')
@Unique(['providerId', 'strategyType'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  @IsEmail()
  email?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  joinedAt?: Date;

  @OneToMany(() => Picture, (pcitrue) => pcitrue.user)
  pictures: Picture[];

  // TODO : 추후 상의 필요
  @Column({ nullable: true })
  strategyType?: string;

  @Column({ nullable: true })
  providerId?: string;
}
