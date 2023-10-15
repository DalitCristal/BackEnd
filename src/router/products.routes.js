import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import productCtrls from "../controllers/products.controllers.js";

const productRouter = Router();

/*************************************** VISTAS ***************************************/
//Nuevo producto
productRouter.get("/static/products/add", productCtrls.renderAddProd);

productRouter.post(
  "/static/products/new-product",
  productCtrls.renderCreateNewProd
);

//Obtener todos los productos
productRouter.get("/static/products", productCtrls.renderProducts);

//Editar producto
productRouter.get("/static/products/edit/:id", productCtrls.renderEditForm);

productRouter.put("/static/products/edit/:id", productCtrls.renderUpdateProd);

//Eliminar producto
productRouter.delete(
  "/static/products/delete/:id",
  productCtrls.renderDeleteProd
);

/************************************** API ***************************************/

//Crear nuevo producto
productRouter.post(
  "/api/products",
  passportError("jwt"),
  authorization("admin"),
  productCtrls.renderApiCreateNewProd
);

//Obtener todos los productos
productRouter.get(
  "/api/products",
  passportError("jwt"),
  authorization("admin"),
  productCtrls.renderApiProducts
);

//Obtener un producto
productRouter.get(
  "/api/products/:id",
  passportError("jwt"),
  authorization("admin"),
  productCtrls.renderApiProductById
);

//Editar producto
productRouter.put(
  "/api/products/:id",
  passportError("jwt"),
  authorization("admin"),
  productCtrls.renderApiUpdateProd
);

//Eliminar producto
productRouter.delete(
  "/api/products/:id",
  passportError("jwt"),
  authorization("admin"),
  productCtrls.renderApiDeleteProd
);

export default productRouter;
