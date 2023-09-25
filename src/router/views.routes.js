import { Router } from "express";
import addProdCtrls from "../controllers/addProd.controllers.js";
import viewsCtrls from "../controllers/views.controllers.js";
const viewsRouter = Router();

//Home
viewsRouter.get("/", viewsCtrls.renderHome);

//Register
viewsRouter.get("/register", viewsCtrls.renderRegister);
viewsRouter.post("/register/new-user", viewsCtrls.renderNewUser);

//Chat
viewsRouter.get("/chat", viewsCtrls.renderChat);

//Nuevo producto
viewsRouter.get("/products/add", addProdCtrls.renderAddProd);

viewsRouter.post("/products/new-product", addProdCtrls.renderNewProd);

//Obtener todos los productos
viewsRouter.get("/products", addProdCtrls.renderProducts);

//Editar producto
viewsRouter.get("/products/edit/:id", addProdCtrls.renderEditForm);

viewsRouter.put("/products/edit/:id", addProdCtrls.renderUpdateProd);

//Eliminar producto
viewsRouter.delete("/products/delete/:id", addProdCtrls.deleteProd);

//Login
viewsRouter.get("/login", viewsCtrls.renderLogin);

export default viewsRouter;
