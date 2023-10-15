import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import usersCtrls from "../controllers/users.controllers.js";
const userRouter = Router();

/*************************************** VISTAS ***************************************/
//TRAER TODOS LOS USUARIOS
//TRAER UN USUARIO
// EDITAR UN USUARIO
//ELIMINAR UN USUARIO

/************************************** API ***************************************/
//Todos los usuarios
userRouter.get(
  "/api/users",
  passportError("jwt"),
  authorization("admin"),
  usersCtrls.renderApiAllUsers
); /*  */
//Un usuario
userRouter.get(
  "/api/users/:id",
  passportError("jwt"),
  authorization("admin"),
  usersCtrls.renderUserByID
); /*  */
//Edita un usuario
userRouter.put(
  "/api/users/:id",
  passportError("jwt"),
  authorization("admin"),
  usersCtrls.renderUpdateUser
); /*  */
//Elimina un usuario
userRouter.delete(
  "/api/users/:id",
  passportError("jwt"),
  authorization("admin"),
  usersCtrls.renderDeleteUser
); /*  */

export default userRouter;
