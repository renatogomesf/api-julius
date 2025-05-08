import { Router } from "express";

import UserController from "../controllers/UserController";

const userRoute = Router();

userRoute.get("/all_user", UserController.getAllUser);

userRoute.get("/one_user/:id", UserController.getOneUser);

userRoute.post("/create_user", UserController.createUser);

userRoute.put("/update_user/:id", UserController.updateUser);

userRoute.delete("/delete_user/:id", UserController.deleteUser);

export default userRoute;
