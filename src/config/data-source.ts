import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Meta } from "../entities/Meta";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456789",
  database: "julius",
  synchronize: false,
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
