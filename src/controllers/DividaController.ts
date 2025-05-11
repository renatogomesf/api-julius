import { Request, Response } from "express";

import { userRepository } from "../repositories/UserRepository";
import { dividasRepository } from "../repositories/DividaRepository";
import { Dividas } from "../entities/Dividas";

class DividasController {
  //======================================================================
  // BUSCA TODAS AS DIVIDAS
  //======================================================================
  async getAllDividas(req: Request, res: Response): Promise<Response | any> {
    try {
      const dividas = await dividasRepository.find();
      return res.status(200).send({ dividas });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  //BUSCA DIVIDA POR ID
  //======================================================================
  async getDividaID(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    try {
      const divida = await dividasRepository.findOne({
        where: { id_divida: id },
        relations: ["user"],
      });
      return res.status(200).send({ divida });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // CRIA UMA DIVIDA
  //======================================================================
  async createDivida(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    const { data, nome, valor } = req.body;

    if (!id || !data || !nome || !valor) {
      return res.status(401).send({ message: "Preencha todos os campos." });
    }

    const user = await userRepository.findOneBy({ id_user: id });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    try {
      const newDivida = new Dividas();

      newDivida.data = data;
      newDivida.nome = nome;
      newDivida.valor = valor;
      newDivida.user = user;

      await dividasRepository.save(newDivida);

      return res.status(201).send({ divida: newDivida });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // ATUALIZAR UMA DIVIDA
  //======================================================================
  async updateDivida(req: Request, res: Response): Promise<Response | any> {
    const { id_divida, id_user } = req.params;

    const { data, nome, valor } = req.body;

    if (!id_divida || !id_user || !data || !nome || !valor) {
      return res.status(401).send({ message: "preencha todos os campos" });
    }

    const user = await userRepository.findOneBy({ id_user: id_user });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const dividaUpdate = await dividasRepository.findOneBy({
      id_divida: id_divida,
    });

    if (!dividaUpdate) {
      return res.status(404).send({ message: "Divida não encontrada" });
    }

    try {
      dividaUpdate.data = data;
      dividaUpdate.nome = nome;
      dividaUpdate.valor = valor;

      await dividasRepository.save(dividaUpdate);

      return res.status(201).send({ divida: dividaUpdate });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // DELETA UMA DIVIDA
  //======================================================================
  async deleteDivida(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "ID da divida é obrigatória." });
    }

    try {
      const divida = await dividasRepository.findOneBy({ id_divida: id });

      if (!divida) {
        return res.status(404).send({ message: "Divida não encontrada." });
      }

      await dividasRepository.delete(id);

      return res.status(200).send({ message: "Divida deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro ao deletar devedor." });
    }
  }
}

export default new DividasController();
