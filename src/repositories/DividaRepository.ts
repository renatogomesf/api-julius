import { AppDataSource } from "../config/data-source";
import { Dividas } from "../entities/Dividas";

export const dividasRepository = AppDataSource.getRepository(Dividas);
