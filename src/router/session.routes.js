import { Router } from "express";
import passport from "passport";
import { userModel } from "../models/users.models.js";

const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    try {
      if (!user) {
        return res.status(401).send({ mensaje: `invalidate user` });
      }

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age_name: req.user.age,
        email_name: req.user.email,
      };

      res.status(200).send({ payload: req.user });
    } catch (error) {
      res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
    }
  }
);
/* sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (req.session.login) {
      res.status(200).send({ resultado: `Login ya existente` });
    } else {
      const user = await userModel.findOne({ email: email });

      if (user) {
        if (user.password == password) {
          req.session.login = true;
          res.status(200).send({ resultado: `Login valido`, message: user });
        } else {
          res
            .status(401)
            .send({ resultado: "Contraseña no valida", message: password });
        }
      } else {
        res.status(404).send({ resultado: "Not Found", message: user });
      }
    }
  } catch (error) {
    res.status(400).send({ error: `Erron en Login: ${error}` });
  }
}); */

sessionRouter.post(
  "/register",
  passport.authenticate("register"),
  async (req, res) => {
    try {
      if (!user) {
        return res.status(400).send({ mensaje: `usuario ya existente` });
      }

      res.status(200).send({ mensaje: `uruario creado` });
    } catch (error) {
      res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
    }
  }
);

sessionRouter.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.status(200).send({ resultado: `Usuario deslogeado` });
});

export default sessionRouter;
