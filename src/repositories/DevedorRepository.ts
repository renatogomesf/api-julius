import { AppDataSource } from "../config/data-source";
import { Devedores } from "../entities/Devedores";

export const devedoresRepository = AppDataSource.getRepository(Devedores)
