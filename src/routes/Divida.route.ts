import { Router } from "express";

import DividaController from "../controllers/DividaController";

const dividasRoute = Router()

dividasRoute.get('/all_dividas', DividaController.getAllDividas)
dividasRoute.get('/one_divida/:id', DividaController.getDividaID)

dividasRoute.post('/create_divida/:id', DividaController.createDivida)

dividasRoute.put('/update_divida/:id_divida/:id_user', DividaController.updateDivida)

dividasRoute.delete('/delete_divida/:id', DividaController.deleteDivida)

export default dividasRoute