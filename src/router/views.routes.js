import { Router } from "express";
import { productModel } from "../models/products.models.js";
const viewsRouter = Router();

viewsRouter.get("/static/chat", (req, res) => {
  res.render("chat", {
    css: "styles.css",
    js: "script.js",
  });
});

viewsRouter.get("/static/home", async (req, res) => {
  let { category, status, limit, page, sort } = req.query;

  const cat = category ?? "virtual";
  const statusProd = status ?? true;
  const limitProd = limit ?? 10;
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
    console.log(productsFromDB);

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

  /* const resultado = await productModel.paginate(
    { category: categoria, status: estado },
    { limit: limite, page: pagina, sort: { price: clasificar } }
  );
  console.log(resultado);

  const arrayProducts = [];
  for (const i of resultado.docs) {
    const product = {
      title: i.title,
      description: i.description,
      stock: i.stock,
      code: i.code,
      price: i.price,
      status: i.status,
      category: i.category,
      id: i._id,
    };
    arrayProducts.push(product);
  } */
  res.render("home", {
    css: "stylesHome.css",
    js: "scriptHome.js",
    prods: productsToShow,
    next: nextPage,
    prev: prevPage,
  });
});

viewsRouter.get("/static/products", (req, res) => {
  res.render("products", {
    css: "stylesProducts.css",
  });
});

export default viewsRouter;
