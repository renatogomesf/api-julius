import { Router } from "express";

import MetaController from "../controllers/MetaController";

const metasRoute = Router()

// não faz muito sentido pois as metas já vem quando busaca usuário
metasRoute.get('/all_metas', MetaController.getAllMetas)
metasRoute.get('/id_meta/:id', MetaController.getMetaID)
//=================================================================

metasRoute.post('/create_meta/:id', MetaController.createMeta)

metasRoute.put('/update_meta/:id_meta/:id_user', MetaController.updateMeta)

metasRoute.delete('/delete_meta/:id', MetaController.deleteMeta)

export default metasRoute