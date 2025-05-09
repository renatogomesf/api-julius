import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./User";

@Entity()
export class Meta {
  @PrimaryGeneratedColumn()
  id_meta: string;

  @Column()
  meta: string;

  @Column()
  valorAtual: number;

  @Column()
  valorTotal: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.meta)
  user: User;
}
