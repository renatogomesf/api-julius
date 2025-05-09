import { AppDataSource } from "../config/data-source";
import { Meta } from "../entities/Meta";

export const metaRepository = AppDataSource.getRepository(Meta);
