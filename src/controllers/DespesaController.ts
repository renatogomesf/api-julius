import { Request, Response } from "express";

import { userRepository } from "../repositories/UserRepository";
import { despesasRepository } from "../repositories/DespesaRepository";
import { Despesas } from "../entities/Despesas";

class GanhoController {
  //======================================================================
  // BUSCA TODAS AS DESPESAS
  //======================================================================
  async getAllDespesas(req: Request, res: Response): Promise<Response | any> {
    try {
      const despesas = await despesasRepository.find();
      return res.status(200).send({ despesas });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  //BUSCA DESPESA POR ID
  //======================================================================
  async getDespesaID(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    try {
      const despesa = await despesasRepository.findOne({
        where: { id_despesa: id },
        relations: ["user"],
      });
      return res.status(200).send({ despesa });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // CRIA UMA DESPESA
  //======================================================================
  async createDespesa(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    const { data, descricao, valor } = req.body;

    if (!id || !data || !descricao || !valor) {
      return res.status(401).send({ message: "Preencha todos os campos" });
    }

    const user = await userRepository.findOneBy({ id_user: id });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    try {
      const newDespesa = new Despesas();

      newDespesa.data = data;
      newDespesa.descricao = descricao;
      newDespesa.valor = valor;
      newDespesa.user = user;

      await despesasRepository.save(newDespesa);

      return res.status(201).send({ despesa: newDespesa });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // ATUALIZAR UMA DESPESA
  //======================================================================
  async updateDespesa(req: Request, res: Response): Promise<Response | any> {
    const { id_despesa, id_user } = req.params;

    const { data, descricao, valor } = req.body;

    if (!id_despesa || !id_user || !data || !descricao || !valor) {
      return res.status(401).send({ message: "Preencha todos os campos" });
    }

    const user = userRepository.findOneBy({ id_user: id_user });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const despesaUpdate = await despesasRepository.findOneBy({
      id_despesa: id_despesa,
    });

    if (!despesaUpdate) {
      return res.status(404).send({ message: "Despesa não encontrada" });
    }

    try {
      despesaUpdate.data = data;
      despesaUpdate.descricao = descricao;
      despesaUpdate.valor = valor;

      await despesasRepository.save(despesaUpdate);

      return res.status(201).send({ despesa: despesaUpdate });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // DELETA UMA DESPESA
  //======================================================================
  async deleteDespesa(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "ID do ganho é obrigatório." });
    }

    try {
      const despesa = await despesasRepository.findOneBy({ id_despesa: id });

      if (!despesa) {
        return res.status(404).send({ message: "Ganho não encontrado." });
      }

      await despesasRepository.delete(id);

      return res.status(200).send({ message: "Despesa deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro ao deletar despesa." });
    }
  }
}

export default new GanhoController();
