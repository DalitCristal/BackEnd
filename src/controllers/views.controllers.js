import { productModel } from "../models/products.models.js";
import { userModel } from "../models/users.models.js";
const viewsCtrls = {};

viewsCtrls.renderHome = async (req, res) => {
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
    //console.log(productsFromDB);

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
};

viewsCtrls.renderRegister = async (req, res) => {
  res.render("register", {
    css: "stylesRegister.css",
    js: "scriptRegister.js",
  });
};

viewsCtrls.renderNewUser = async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;
  try {
    const newUser = await userModel.create({
      first_name,
      last_name,
      age,
      email,
      password,
    });
    res.status(200).send({ respuesta: "OK", mensaje: newUser });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error al crear usuario", mensaje: error });
  }
};

viewsCtrls.renderLogin = (req, res) => {
  res.render("login", {
    css: "stylesLogin.css",
    js: "scriptLogin.js",
  });
};

viewsCtrls.renderChat = (req, res) => {
  res.render("chat", {
    css: "stylesChat.css",
    js: "script.js",
  });
};
/* 
viewsCtrls.renderProducts = (req, res) => {
  res.render("products", {
    css: "stylesProducts.css",
    js: "scriptProducts.js",
  });
}; */

export default viewsCtrls;
