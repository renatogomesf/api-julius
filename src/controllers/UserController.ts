import { Request, Response } from "express";

import { userRepository } from "../repositories/UserRepository";

class UserController {
  //======================================================================
  // BUSCA TODOS OS USUÁRIOS
  //======================================================================
  async getAllUser(req: Request, res: Response): Promise<Response | any> {
    try {
      const users = await userRepository.find({
        relations: ["metas", "ganhos", "despesas", "devedores", "dividas"],
      });
      return res.status(200).send({ users });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  //BUSCA 1 USUÁRIO
  //======================================================================
  async getOneUser(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    try {
      const user = await userRepository.findOne({
        where: { id_user: id },
        relations: ["metas", "ganhos", "despesas", "devedores", "dividas"],
      });
      return res.status(200).send({ user });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // CRIA UM USUÁRIO
  //======================================================================
  async createUser(req: Request, res: Response): Promise<Response | any> {
    const { firstName, lastName, email, age, wage } = req.body;

    if (!firstName || !lastName || !email || !age || !wage) {
      return res.status(401).send({ message: "preencha todos os campos" });
    }

    try {
      const newUser = userRepository.create({
        firstName,
        lastName,
        email,
        age,
        wage,
      });

      await userRepository.save(newUser);

      return res.status(201).send({ user: newUser });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // ATUALIZA UM USUÁRIO
  //======================================================================
  async updateUser(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    const { firstName, lastName, email, age, wage } = req.body;

    if (!id || !firstName || !lastName || !email || !age || !wage) {
      return res.status(401).send({ message: "preencha todos os campos" });
    }

    try {
      const user = await userRepository.findOneBy({ id_user: id });

      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }

      // atualizar os campos
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.age = age;
      user.wage = wage;

      const updatedUser = await userRepository.save(user);

      return res
        .status(200)
        .send({ message: "Usuário atualizado com sucesso", user: updatedUser });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // DELETA UM USUÁRIO
  //======================================================================
  async deleteUser(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "ID do usuário é obrigatório." });
    }

    try {
      const user = await userRepository.findOneBy({ id_user: id });

      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }

      await userRepository.delete(id);

      return res.status(200).send({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro ao deletar usuário." });
    }
  }
}

export default new UserController();
