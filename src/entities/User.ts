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
import { Devedores } from "./Devedores";
import { Dividas } from "./Dividas";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  wage: number;

  @Column()
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Meta, (meta) => meta.user)
  metas: Meta[];

  @OneToMany(() => Ganhos, (ganhos) => ganhos.user)
  ganhos: Ganhos[];

  @OneToMany(() => Despesas, (ganhos) => ganhos.user)
  despesas: Despesas[];

  @OneToMany(() => Devedores, (medevem) => medevem.user)
  devedores: Devedores;

  @OneToMany(() => Dividas, (medevem) => medevem.user)
  dividas: Dividas;
}
