import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Meta } from "./Meta";

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
  meta: Meta[];
}
