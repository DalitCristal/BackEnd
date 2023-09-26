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
import viewsRouter from "./router/views.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "./router/session.routes.js";
import methodOverride from "method-override";

// Resto de tu código

//INICIALIZACION
const app = express();
const PORT = 8080;

//BDD
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BDD is connected");
  })
  .catch(() => console.log("Error en conexion a BDD"));

//SETTINGS
const server = app.listen(PORT, () => {
  console.log(`Servidor conectado en Puerto ${PORT}`);
});
app.set("views", path.resolve(_dirname, "./views"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

//MIDLEWEARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopoLogy: true,
      },
      ttl: 60,
    }),

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(methodOverride("_method"));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//STATIC FILES
app.use("/static", express.static(path.join(_dirname, "/public")));

//SOCKET IO
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

//RUTAS

app.use("/static", viewsRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/session", sessionRouter);
