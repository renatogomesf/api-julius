import { Request, Response } from "express";

import { userRepository } from "../repositories/UserRepository";
import { devedoresRepository } from "../repositories/DevedorRepository";
import { Devedores } from "../entities/Devedores";

class DevedoresController {
  //======================================================================
  // BUSCA TODOS OS DEVEDORES
  //======================================================================
  async getAllDevedores(req: Request, res: Response): Promise<Response | any> {
    try {
      const devedores = await devedoresRepository.find();
      return res.status(200).send({ devedores });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  //BUSCA DEVEDOR POR ID
  //======================================================================
  async getDevedorID(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    try {
      const devedor = await devedoresRepository.findOne({
        where: { id_devedor: id },
        relations: ["user"],
      });
      return res.status(200).send({ devedor });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // CRIA UM Me Devem
  //======================================================================
  async createDevedor(req: Request, res: Response): Promise<Response | any> {
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
      const newDevedor = new Devedores();

      newDevedor.data = data;
      newDevedor.nome = nome;
      newDevedor.valor = valor;
      newDevedor.user = user;

      await devedoresRepository.save(newDevedor);

      return res.status(201).send({ medevem: newDevedor });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // ATUALIZAR UM DEVEDOR
  //======================================================================
  async updateDevedor(req: Request, res: Response): Promise<Response | any> {
    const { id_devedor, id_user } = req.params;

    const { data, nome, valor } = req.body;

    if (!id_devedor || !id_user || !data || !nome || !valor) {
      return res.status(401).send({ message: "preencha todos os campos" });
    }

    const user = await userRepository.findOneBy({ id_user: id_user });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const devedorUpdate = await devedoresRepository.findOneBy({
      id_devedor: id_devedor,
    });

    if (!devedorUpdate) {
      return res.status(404).send({ message: "Devedor não encontrado" });
    }

    try {
      devedorUpdate.data = data;
      devedorUpdate.nome = nome;
      devedorUpdate.valor = valor;

      await devedoresRepository.save(devedorUpdate);

      return res.status(201).send({ devedor: devedorUpdate });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // DELETA UM DEVEDOR
  //======================================================================
  async deleteDevedor(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "ID da devedor é obrigatório." });
    }

    try {
      const devedor = await devedoresRepository.findOneBy({ id_devedor: id });

      if (!devedor) {
        return res.status(404).send({ message: "Devedor não encontrada." });
      }

      await devedoresRepository.delete(id);

      return res.status(200).send({ message: "Devedor deletado com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro ao deletar devedor." });
    }
  }
}

export default new DevedoresController();
