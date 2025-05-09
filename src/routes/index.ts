import { Router } from "express";

import userRoute from "./User.routes";

import metasRoute from "./Meta.routes";

const router = Router()

router.use('/v1', userRoute, metasRoute)

export default router