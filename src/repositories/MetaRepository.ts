import { AppDataSource } from "../config/data-source";
import { Meta } from "../entities/Meta";

export const metasRepository = AppDataSource.getRepository(Meta);
