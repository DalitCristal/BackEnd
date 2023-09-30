import { Router } from "express";
import usersCtrls from "../controllers/users.controllers.js";
const userRouter = Router();

/*************************************** VISTAS ***************************************/
//TRAER TODOS LOS USUARIOS
//TRAER UN USUARIO
// EDITAR UN USUARIO
//ELIMINAR UN USUARIO

/************************************** API ***************************************/
//Todos los ususarios
userRouter.get("/api/users", usersCtrls.renderApiAllUsers); /*  */
//Un usuario
userRouter.get("/api/users/:id", usersCtrls.renderUserByID); /*  */
//Edita un usuario
userRouter.put("/api/users/:id", usersCtrls.renderUpdateUser); /*  */
//Elimina un usuario
userRouter.delete("/api/users/:id", usersCtrls.renderDeleteUser); /*  */

export default userRouter;
