import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./User";

@Entity()
export class Devedores {
  @PrimaryGeneratedColumn()
  id_devedor: string;

  @Column()
  data: Date;

  @Column()
  nome: string;

  @Column()
  valor: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(()=> User, (user)=>user.devedores)
  user: User
}
