import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import sessionsCtrls from "../controllers/session.controllers.js";

const sessionRouter = Router();

/*************************************** VISTAS ***************************************/

//Formulario para registrarse
sessionRouter.get("/static/signup", sessionsCtrls.renderSignUpForm);
sessionRouter.post(
  "/static/signup",
  passport.authenticate("register"),
  sessionsCtrls.renderSignUp
);

//Formulario para iniciar sesión
sessionRouter.get("/static/signin", sessionsCtrls.renderSignInForm);

sessionRouter.post(
  "/static/signin",
  passport.authenticate("login", {
    failureRedirect: "/static/signin",
    successRedirect: "/static",
    failureFlash: true,
  }),
  sessionsCtrls.renderSignIn
);

//Cerrar sesión
sessionRouter.get("/static/logout", sessionsCtrls.renderLogOut);

/*************************************** API ***************************************/
//Iniciar sesión
sessionRouter.post(
  "/api/session/signin",
  passport.authenticate("login"),
  sessionsCtrls.renderApiLogin
);

//Registrarse
sessionRouter.post(
  "/api/session/signup",
  passport.authenticate("register"),
  sessionsCtrls.renderApiSignUp
);

//Registrarse a través de github
sessionRouter.get(
  "/api/session/github",
  passport.authenticate("github", { scope: [`user:email`] }),
  sessionsCtrls.renderApiGithubSignUp
);

//Iniciar sesión a través de github
sessionRouter.get(
  "/api/session/githubCallback",
  passport.authenticate("github"),
  sessionsCtrls.renderApiGithubSignIn
);

//Cerrar sesión
sessionRouter.get("/api/session/logout", sessionsCtrls.renderApiLogOut);

//TEST
sessionRouter.get(
  "/api/session/test-jwt",
  passport.authenticate("jwt", { session: false }),
  sessionsCtrls.getAuth
);

sessionRouter.get(
  "/api/session/current",
  passportError("jwt"),
  authorization("user"),
  sessionsCtrls.getUser
);

export default sessionRouter;
