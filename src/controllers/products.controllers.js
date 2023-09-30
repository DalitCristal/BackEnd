import { productModel } from "../models/products.models.js";

const productCtrls = {};

/*************************************** VISTAS ***************************************/

productCtrls.renderAddProd = (req, res) => {
  res.render("newProd", {
    css: "stylesNewProd.css",
  });
};

productCtrls.renderCreateNewProd = async (req, res) => {
  const { title, description, stock, code, price, category } = req.body;
  try {
    const newProd = await productModel.create({
      title,
      description,
      stock,
      code,
      price,
      category,
    });
    req.flash("seccess_alert", "Producto creado satisfactoriamente");
    res.redirect("/static/products");
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error al crear nuevo producto", mensaje: error });
  }
};

productCtrls.renderProducts = async (req, res) => {
  let { category, status, limit, page, sort } = req.query;

  const cat = category ?? "virtual";
  const statusProd = status ?? true;
  const limitProd = limit ?? 12;
  const pageProd = page ?? 1;
  const order = sort ?? "desc";
  let productsFromDB;
  let productsToShow;
  let nextPage;
  let prevPage;

  if (cat == undefined) {
    productsFromDB = await productModel.paginate(
      {},
      { limit: limitProd, page: pageProd, sort: { price: order } }
    );
    productsToShow = [];
    for (let prod of productsFromDB.docs) {
      let prodRendered = {
        title: prod.title,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        category: prod.category,
        status: prod.status,
        code: prod.code,
        thumbnails: prod.thumbnails,
        id: prod._id,
      };
      productsToShow.push(prodRendered);
    }
    if (!productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
      prevPage = 1;
      nextPage = productsFromDB.nextPage;
    } else if (productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
      prevPage = productsFromDB.prevPage;
      nextPage = productsFromDB.nextPage;
    } else if (!productsFromDB.hasNextPage) {
      nextPage = productsFromDB.totalPages;
      prevPage = productsFromDB.prevPage;
    }
  } else {
    productsFromDB = await productModel.paginate(
      { category: cat },
      { limit: limitProd, page: pageProd, sort: { price: order } }
    );
    productsToShow = [];
    for (let prod of productsFromDB.docs) {
      let prodRendered = {
        title: prod.title,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        category: prod.category,
        status: prod.status,
        code: prod.code,
        thumbnails: prod.thumbnails,
        id: prod._id,
      };
      productsToShow.push(prodRendered);
    }
    if (!productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
      prevPage = 1;
      nextPage = productsFromDB.nextPage;
    } else if (productsFromDB.hasPrevPage && productsFromDB.hasNextPage) {
      prevPage = productsFromDB.prevPage;
      nextPage = productsFromDB.nextPage;
    } else if (!productsFromDB.hasNextPage) {
      nextPage = productsFromDB.totalPages;
      prevPage = productsFromDB.prevPage;
    }
  }
  res.render("allProd", {
    css: "stylesAllProd.css",
    prods: productsToShow,
    next: nextPage,
    prev: prevPage,
  });
};

productCtrls.renderEditForm = async (req, res) => {
  const { id } = req.params;
  let newProd;
  try {
    const prod = await productModel.findById(id);
    if (prod) {
      newProd = {
        title: prod.title,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        category: prod.category,
        status: prod.status,
        code: prod.code,
        id: prod._id,
      };
      res.render("editProd", {
        product: newProd,
      });
    } else {
      res.status(400).send({
        respuesta: "Error capturar informacion de la bdd",
        mensaje: error,
      });
    }
  } catch (error) {
    res.status(400).send({
      respuesta: "Error capturar informacion del producto en la bdd",
      mensaje: error,
    });
  }
};

productCtrls.renderUpdateProd = async (req, res) => {
  const { id } = req.params;
  const { title, description, stock, status, code, price, category } = req.body;

  try {
    const prod = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
      stock,
      category,
      status,
      code,
    });

    if (prod) {
      req.flash("seccess_alert", "Producto actualizado satisfactoriamente");
      res.redirect("/static/products");
    } else
      res.status(404).send({
        respuesta: "Error en actualizar Producto",
        mensaje: "Not Found",
      });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en actualizar producto", mensaje: error });
  }
};

productCtrls.renderDeleteProd = async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findByIdAndDelete(id);
    if (prod) {
      req.flash("seccess_alert", "Producto eliminado satisfactoriamente");
      res.redirect("/static/products");
    } else
      res.status(404).send({
        respuesta: "Error en eliminar Producto",
        mensaje: "Not Found",
      });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en eliminar producto", mensaje: error });
  }
};

/************************************** API ***************************************/

productCtrls.renderApiProducts = async (req, res) => {
  const { limit } = req.query;
  try {
    const prods = await productModel.find().limit(limit);
    res.status(200).send({ respuesta: "OK", mensaje: prods });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar productos", mensaje: error });
  }
};

// ------ Buscar producto por ID ------
productCtrls.renderApiProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findById(id);
    if (prod) {
      res.status(200).send({ respuesta: "OK", mensaje: prod });
    } else {
      res.status(404).send({
        respuesta: "Error en consultar Producto",
        mensaje: "Not Found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar producto", mensaje: error });
  }
};

// ------ Creaer producto ------
productCtrls.renderApiCreateNewProd = async (req, res) => {
  const { title, description, price, stock, code, thumbnail, category } =
    req.body;

  try {
    const prod = await productModel.create({
      title,
      description,
      price,
      stock,
      code,
      category,
    });
    res.status(200).send({ respuesta: "OK", mensaje: prod });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en crear producto", mensaje: error });
  }
};

// ------ Actualizar un producto ------
productCtrls.renderApiUpdateProd = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, stock, code, thumbnail, category } =
    req.body;

  try {
    const prod = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
      stock,
      code,
      thumbnail,
      category,
    });
    if (prod) {
      res
        .status(200)
        .send({ respuesta: "OK", mensaje: "Producto Actualizado" });
    } else {
      res.status(404).send({
        respuesta: "Error en actualizar producto",
        mensaje: "Not Found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en actualizar un producto", mensaje: error });
  }
};

// ------ Borrar un producto ------
productCtrls.renderApiDeleteProd = async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findByIdAndDelete(id);
    if (prod) {
      res.status(200).send({ respuesta: "OK", mensaje: "Producto Borrado" });
    } else {
      res.status(404).send({
        respuesta: "Error en borrar producto",
        mensaje: "Not Found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en borrar producto", mensaje: error });
  }
};

export default productCtrls;
