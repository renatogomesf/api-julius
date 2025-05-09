import { Router } from "express";

import DespesaController from "../controllers/DespesaController";

const despesasRoute = Router()

// não faz muito sentido pois as metas já vem quando busaca usuário
despesasRoute.get('/all_despesas', DespesaController.getAllDespesas)
despesasRoute.get('/one_despesa/:id', DespesaController.getDespesaID)
//=================================================================

despesasRoute.post('/create_despesa/:id', DespesaController.createDespesa)

despesasRoute.put('/update_despesa/:id_despesa/:id_user', DespesaController.updateDespesa)

despesasRoute.delete('/delete_despesa/:id', DespesaController.deleteDespesa)

export default despesasRoute