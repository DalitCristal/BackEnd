import { productModel } from "../models/products.models.js";

const addProdCtrls = {};

addProdCtrls.renderAddProd = (req, res) => {
  res.render("newProd", {
    css: "stylesNewProd.css",
  });
};

addProdCtrls.renderNewProd = async (req, res) => {
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
    res.status(200).send({ respuesta: "OK", mensaje: newProd });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error al crear nuevo producto", mensaje: error });
  }
};

addProdCtrls.renderProducts = async (req, res) => {
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

addProdCtrls.renderEditForm = (req, res) => {
  res.send("formulario editar producto");
};

addProdCtrls.renderUpdateProd = (req, res) => {
  res.send("editar producto");
};

addProdCtrls.deleteProd = (req, res) => {
  res.send("producto eliminado");
};

export default addProdCtrls;
