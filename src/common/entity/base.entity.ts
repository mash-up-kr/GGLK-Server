import { Column, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false, select: false })
  isDeleted: boolean;
}
