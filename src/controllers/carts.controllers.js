import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
const cartsCtrls = {};

cartsCtrls.getCartById = async (req, res) => {
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
};

cartsCtrls.postAddProd = async (req, res) => {
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
};

cartsCtrls.deleteProd = async (req, res) => {
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
};

cartsCtrls.putProds = async (req, res) => {
  const { cid } = req.params;
  const arr = req.body;

  try {
    const cart = await cartModel.findById(cid);
    arr.forEach((p) => {
      let i = cart.products.findIndex((prod) => prod.id_prod._id == p.id_prod);

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
};

cartsCtrls.putQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const prod = await productModel.findById(pid);

      if (prod) {
        const indice = cart.products.findIndex(
          (item) => item.id_prod._id == pid
        );
        console.log(indice);
        if (indice != -1) {
          cart.products[indice].quantity = quantity;
        } else {
          cart.products.push({ id_prod: pid, quantity: quantity });
        }
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: "OK", mensaje: respuesta });
      } else {
        res.status(404).send({
          respuesta: "Error en actualizar cantidad de producto Carrito",
          mensaje: "Produt Not Found",
        });
      }
    } else {
      res.status(404).send({
        respuesta: "Error en actualizar cantidad de producto Carrito",
        mensaje: "Cart Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      respuesta: "Error en actualizar cantidad de producto Carrito",
      mensaje: error,
    });
  }
};

cartsCtrls.deleteProds = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartModel.findById(cid);

    cart.products = [];

    const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
    res.status(200).send({ respuesta: "OK", mensaje: respuesta });
  } catch (error) {
    res.status(400).send({
      respuesta: "Error en eliminar todos los productos Carrito",
      mensaje: error,
    });
  }
};

export default cartsCtrls;
