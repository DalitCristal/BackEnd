import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/users.routes.js";
import productRouter from "./router/products.routes.js";
import cartRouter from "./router/carts.routes.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { messageModel } from "../src/models/messages.models.js";
import path from "path";
import { _dirname } from "./path.js";
import { userModel } from "./models/users.models.js";
import { cartModel } from "./models/carts.models.js";
import { productModel } from "./models/products.models.js";
import viewsRouter from "./router/views.routes.js";

const app = express();
const PORT = 8080;

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BDD conectada");
  })
  .catch(() => console.log("Error en conexion a BDD"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = app.listen(PORT, () => {
  console.log(`Servidor en conectado en Puerto ${PORT}`);
});

app.use("/static", express.static(path.join(_dirname, "/public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(_dirname, "./views"));

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("servidor socket io conectado");
  socket.on("mensaje", async (infoMessage) => {
    try {
      let usuario = infoMessage.user;
      let mensaje = infoMessage.newMessage;
      let allMessages = await messageModel.find();
      const modelMessage = await messageModel.create({
        email: usuario,
        message: mensaje,
      });

      allMessages.push(modelMessage);
      socket.emit("todosLosMensajes", allMessages);
    } catch (e) {
      console.error(e);
    }
  });
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
