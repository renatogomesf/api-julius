import { Request, Response } from "express";

import { metaRepository } from "../repositories/MetaRepository";
import { Meta } from "../entities/Meta";

import { userRepository } from "../repositories/UserRepository";

class MetaController {
  //======================================================================
  // BUSCA TODAS AS METAS
  //======================================================================
  async getAllMeta(req: Request, res: Response): Promise<Response | any> {
    try {
      const meta = await metaRepository.find();
      return res.status(200).send({ meta });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  //BUSCA META POR ID
  //======================================================================
  async getMetaID(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    try {
      const meta = await metaRepository.findOne({
        where: { id_meta: id },
        relations: ["user"],
      });
      return res.status(200).send({ meta });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // CRIA UMA META
  //======================================================================
  async createMeta(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    const { meta, valorAtual, valorTotal } = req.body;

    if (!id || !meta || !valorAtual || !valorTotal) {
      return res.status(401).send({ message: "preencha todos os campos" });
    }

    const user = await userRepository.findOneBy({ id_user: id });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    try {
      const newMeta = new Meta();

      newMeta.meta = meta;
      newMeta.valorAtual = valorAtual;
      newMeta.valorTotal = valorTotal;
      newMeta.user = user;

      await metaRepository.save(newMeta);

      return res.status(201).send({ meta: newMeta });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // ATUALIZAR UMA META
  //======================================================================
  async updateMeta(req: Request, res: Response): Promise<Response | any> {
    const { id_meta, id_user } = req.params;

    const { meta, valorAtual, valorTotal } = req.body;

    if (!id_meta || !id_user || !meta || !valorAtual || !valorTotal) {
      return res.status(401).send({ message: "preencha todos os campos" });
    }

    const user = await userRepository.findOneBy({ id_user: id_user });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const metaUpdate = await metaRepository.findOneBy({ id_meta: id_meta });

    if (!metaUpdate) {
      return res.status(404).send({ message: "Meta não encontrada" });
    }

    try {
      metaUpdate.meta = meta;
      metaUpdate.valorAtual = valorAtual;
      metaUpdate.valorTotal = valorTotal;

      await metaRepository.save(metaUpdate);

      return res.status(201).send({ meta: metaUpdate });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }


  //======================================================================
  // DELETA UM USUÁRIO
  //======================================================================
  async deleteMeta(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "ID da meta é obrigatório." });
    }

    try {
      const meta = await metaRepository.findOneBy({ id_meta: id });

      console.log(meta);

      if (!meta) {
        return res.status(404).send({ message: "Meta não encontrada." });
      }

      await metaRepository.delete(id);

      return res.status(200).send({ message: "Meta deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro ao deletar meta." });
    }
  }
}

export default new MetaController();
