import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import viewsCtrls from "../controllers/views.controllers.js";

const homeRouter = Router();
//Home
homeRouter.get("/static", viewsCtrls.renderHome);

//Chat
homeRouter.get("/static/chat", viewsCtrls.renderChat);

export default homeRouter;
