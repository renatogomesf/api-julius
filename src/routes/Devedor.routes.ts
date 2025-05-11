import { Router } from "express";

import DevedorController from "../controllers/DevedorController";

const devedoresRoute = Router()

// não faz muito sentido pois as metas já vem quando busaca usuário
devedoresRoute.get('/all_devedores', DevedorController.getAllDevedores)
devedoresRoute.get('/one_devedor/:id', DevedorController.getDevedorID)
//=================================================================

devedoresRoute.post('/create_devedor/:id', DevedorController.createDevedor)

devedoresRoute.put('/update_devedor/:id_devedor/:id_user', DevedorController.updateDevedor)

devedoresRoute.delete('/delete_devedor/:id', DevedorController.deleteDevedor)

export default devedoresRoute