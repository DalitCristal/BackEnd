import { Router } from "express";
import viewsCtrls from "../controllers/views.controllers.js";
const viewsRouter = Router();

//Home
viewsRouter.get("/", viewsCtrls.renderHome);

//Chat
viewsRouter.get("/chat", viewsCtrls.renderChat);

export default viewsRouter;
