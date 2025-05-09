import { AppDataSource } from "../config/data-source";
import { Ganhos } from "../entities/Ganhos";

export const ganhosRepository = AppDataSource.getRepository(Ganhos)