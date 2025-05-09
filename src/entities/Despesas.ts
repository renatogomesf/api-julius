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
export class Despesas {
  @PrimaryGeneratedColumn()
  id_despesa: string;

  @Column()
  data: Date;

  @Column()
  descricao: string;

  @Column()
  valor: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(()=> User, (user)=>user.despesas)
  user: User
}
