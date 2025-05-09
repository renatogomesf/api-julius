import { AppDataSource } from "../config/data-source";
import { Despesas } from "../entities/Despesas";

export const despesasRepository = AppDataSource.getRepository(Despesas)