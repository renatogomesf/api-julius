import { Request, Response } from "express";

import { userRepository } from "../repositories/UserRepository";
import { ganhosRepository } from "../repositories/GanhoRepository";
import { Ganhos } from "../entities/Ganhos";

class GanhoController {
  //======================================================================
  // BUSCA TODAS OS GANHOS
  //======================================================================
  async getAllGanhos(req: Request, res: Response): Promise<Response | any> {
    try {
      const ganhos = await ganhosRepository.find();
      return res.status(200).send({ ganhos });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  //BUSCA GANHO POR ID
  //======================================================================
  async getGanhoID(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    try {
      const ganho = await ganhosRepository.findOne({
        where: { id_ganho: id },
        relations: ["user"],
      });
      return res.status(200).send({ ganho });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // CRIA UM GANHO
  //======================================================================
  async createGanho(req: Request, res: Response): Promise<Response | any> {
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
      const newGanho = new Ganhos();

      newGanho.data = data;
      newGanho.descricao = descricao;
      newGanho.valor = valor;
      newGanho.user = user;

      await ganhosRepository.save(newGanho);

      return res.status(201).send({ ganho: newGanho });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // ATUALIZAR UM GANHO
  //======================================================================
  async updateGanho(req: Request, res: Response): Promise<Response | any> {
    const { id_ganho, id_user } = req.params;

    const { data, descricao, valor } = req.body;

    if (!id_ganho || !id_user || !data || !descricao || !valor) {
      return res.status(401).send({ message: "Preencha todos os campos" });
    }

    const user = userRepository.findOneBy({ id_user: id_user });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const ganhoUpdate = await ganhosRepository.findOneBy({
      id_ganho: id_ganho,
    });

    if (!ganhoUpdate) {
      return res.status(404).send({ message: "Ganho não encontrado" });
    }

    try {
      ganhoUpdate.data = data;
      ganhoUpdate.descricao = descricao;
      ganhoUpdate.valor = valor;

      await ganhosRepository.save(ganhoUpdate);

      return res.status(201).send({ ganho: ganhoUpdate });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // DELETA UM GANHO
  //======================================================================
  async deleteGanho(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "ID do ganho é obrigatório." });
    }

    try {
      const ganho = await ganhosRepository.findOneBy({ id_ganho: id });

      if (!ganho) {
        return res.status(404).send({ message: "Ganho não encontrado." });
      }

      await ganhosRepository.delete(id);

      return res.status(200).send({ message: "Ganho deletado com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro ao deletar ganho." });
    }
  }
}

export default new GanhoController();
