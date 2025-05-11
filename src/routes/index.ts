import { Router } from "express";

import userRoute from "./User.routes";
import metasRoute from "./Meta.routes";
import ganhosRoute from "./Ganho.routes";
import despesasRoute from "./Despesa.routes";
import devedoresRoute from "./Devedor.routes";


const router = Router()

router.use('/v1', userRoute, metasRoute, ganhosRoute, despesasRoute, devedoresRoute)

export default router