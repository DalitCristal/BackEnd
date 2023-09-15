import { Router } from "express";
import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

const cartRouter = Router();

cartRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await cartModel.findById(id);
    if (cart) res.status(200).send({ respuesta: "OK", mensaje: cart });
    else
      res.status(404).send({
        respuesta: "Error en consultar Carrito",
        mensaje: "Not Found",
      });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consulta carrito", mensaje: error });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const cart = await cartModel.create({});
    res.status(200).send({ respuesta: "OK", mensaje: cart });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en crear Carrito", mensaje: error });
  }
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const prod = await productModel.findById(pid);

      if (prod) {
        const indice = cart.products.findIndex((item) => item.id_prod == pid);
        if (indice != -1) {
          cart.products[indice].quantity = quantity;
        } else {
          cart.products.push({ id_prod: pid, quantity: quantity });
        }
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: "OK", mensaje: respuesta });
      } else {
        res.status(404).send({
          respuesta: "Error en agregar producto Carrito",
          mensaje: "Produt Not Found",
        });
      }
    } else {
      res.status(404).send({
        respuesta: "Error en agregar producto Carrito",
        mensaje: "Cart Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ respuesta: "Error en agregar producto Carrito", mensaje: error });
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);

    if (cart) {
      const prod = await productModel.findById(pid);

      if (prod) {
        const posicion = cart.products.findIndex((item) => item.id_prod == pid);

        cart.products.splice(posicion, 1);

        const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: "OK", mensaje: respuesta });
      } else {
        res.status(404).send({
          respuesta: "Error en eliminar producto Carrito",
          mensaje: "Produt Not Found",
        });
      }
    } else {
      res.status(404).send({
        respuesta: "Error en eliminar producto Carrito",
        mensaje: "Cart Not Found",
      });
    }
  } catch (error) {
    res.status(400).send({
      respuesta: "Error en eliminar producto Carrito",
      mensaje: error,
    });
  }
});

cartRouter.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const arr = req.body;
  try {
    const cart = await cartModel.findById(cid);
    arr.forEach((p) => {
      let i = cart.products.findIndex((prod) => prod.id_prod == p.id_prod);
      if (i != -1) {
        cart.products[i] = p;
      } else {
        cart.products.push(p);
      }
    });
    const response = await cartModel.findByIdAndUpdate(cid, cart);
    res.status(200).send({
      respuesta: "Se actualizaron prods correctamente",
      mensaje: response,
    });
  } catch (error) {
    res.status(400).send({ respuesta: "Hubo un problema", mensaje: error });
  }
});

export default cartRouter;

/* 
{
    "id_prod": "64f3eea179c2827e1bd4da93",
    "quantity": 25
} */
