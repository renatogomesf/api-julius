import { Router } from "express";

import userRoute from "./User.routes";

const router = Router()

router.use('/v1', userRoute)

export default router