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

  const categoria = category ?? "virtual";
  const estado = status ?? true;
  const limite = limit ?? 10;
  const pagina = page ?? 1;
  const clasificar = sort ?? "desc";

  const resultado = await productModel.paginate(
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
  }
  res.render("home", {
    css: "stylesHome.css",
    js: "scriptHome.js",
    prods: arrayProducts,
  });
});

viewsRouter.get("/static/products", (req, res) => {
  res.render("products", {
    css: "stylesProducts.css",
  });
});

export default viewsRouter;
