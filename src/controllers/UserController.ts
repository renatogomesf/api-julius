import { Request, Response } from "express";

import { userRepository } from "../repositories/UserRepository";

class UserController {
  //======================================================================
  // BUSCA TODOS OS USUÁRIOS
  //======================================================================
  async getAllUser(req: Request, res: Response): Promise<Response | any> {
    try {
      const users = await userRepository.find();
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
      const user = await userRepository.findOneBy({ id_user: id });
      return res.status(200).send({ user });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  //======================================================================
  // CRIA UM USUÁRIO
  //======================================================================
  async createUser(req: Request, res: Response): Promise<Response | any> {
    const { firstName, lastName, age, wage } = req.body;

    if (!firstName || !lastName || !age || !wage) {
      return res.status(401).send({ message: "preencha todos os campos" });
    }

    try {
      const newUser = userRepository.create({
        firstName,
        lastName,
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

    const { firstName, lastName, age, wage } = req.body;

    if (!id || !firstName || !lastName || !age || !wage) {
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

      console.log(user);

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
