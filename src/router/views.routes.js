import { Router } from "express";
import viewsCtrls from "../controllers/views.controllers.js";
import usersCtrls from "../controllers/users.controllers.js";
const viewsRouter = Router();

//Home
viewsRouter.get("/", viewsCtrls.renderHome);

//Register
/* viewsRouter.get("/signup", usersCtrls.renderSignUpForm);
viewsRouter.post("/signup", usersCtrls.renderSignUp);
viewsRouter.get("/signin", usersCtrls.renderSignInForm);
viewsRouter.post("/signin", usersCtrls.renderSignIn);
viewsRouter.get("/logout", usersCtrls.renderLogOut); */

//Chat
viewsRouter.get("/chat", viewsCtrls.renderChat);

//Login
viewsRouter.get("/login", viewsCtrls.renderLogin);

export default viewsRouter;
