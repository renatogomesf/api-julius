import { Router } from "express";

import GanhoController from "../controllers/GanhoController";

const ganhosRoute = Router()

// não faz muito sentido pois as metas já vem quando busaca usuário
ganhosRoute.get('/all_ganhos', GanhoController.getAllGanhos)
ganhosRoute.get('/one_ganho/:id', GanhoController.getGanhoID)
//=================================================================

ganhosRoute.post('/create_ganho/:id', GanhoController.createGanho)

ganhosRoute.put('/update_ganho/:id_ganho/:id_user', GanhoController.updateGanho)

ganhosRoute.delete('/delete_ganho/:id', GanhoController.deleteGanho)

export default ganhosRoute