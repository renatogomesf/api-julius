import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Meta } from "./Meta";
import { Ganhos } from "./Ganhos";
import { Despesas } from "./Despesas";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  wage: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Meta, (meta) => meta.user)
  metas: Meta[];

  @OneToMany(()=> Ganhos, (ganhos)=>ganhos.user)
  ganhos: Ganhos[]
  
  @OneToMany(()=> Despesas, (ganhos)=>ganhos.user)
  despesas: Despesas[]
}
