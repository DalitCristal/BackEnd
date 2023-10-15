import { generateToken } from "../utils/jwt.js";
const sessionsCtrls = {};

/*************************************** VISTAS ***************************************/
//Iniciar sesión
sessionsCtrls.renderSignInForm = (req, res) => {
  res.render("login", {
    css: "stylesRegister.css",
  });
};
sessionsCtrls.renderSignIn = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ mensaje: `Usuario invalido` });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age_name: req.user.age,
      email_name: req.user.email,
    };

    req.flash("seccess_alert", `Bienvenido ${req.user.first_name} `);
    res.redirect("/static/", 200, { resultado: "Usuario logueado" });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
  }
};

//registrarse
sessionsCtrls.renderSignUpForm = (req, res) => {
  res.render("signUp", {
    css: "stylesRegister.css",
  });
};

sessionsCtrls.renderSignUp = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({ mensaje: "Usuario ya existente" });
    } else {
      req.flash(
        "seccess_alert",
        `${req.user.first_name} tu cuenta se creo con exito `
      );
      res.redirect("/static/signin");
    }
  } catch (error) {
    res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
  }
};

//Cerrar sesión
sessionsCtrls.renderLogOut = (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  req.flash("seccess_alert", "Sesión cerrada con exito");
  res.redirect("/static/signin");
};

/*************************************** API ***************************************/
sessionsCtrls.renderApiLogin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ mensaje: `Usuario invalido` });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age_name: req.user.age,
      email_name: req.user.email,
    };

    const token = generateToken(req.user);
    res.cookie("jwtCookie", token, {
      maxAge: 43200000, //12hs en ms
    });

    res.status(200).send({ payload: req.user });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
  }
};

sessionsCtrls.renderApiSignUp = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({ mensaje: "Usuario ya existente" });
    }

    res.status(200).send({ mensaje: "Usuario registrado" });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
  }
};

sessionsCtrls.renderApiGithubSignUp = async (req, res) => {
  res.status(200).send({ mensaje: "Usuario registrado" });
};

sessionsCtrls.renderApiGithubSignIn = async (req, res) => {
  req.session.user = req.user;
  res.status(200).send({ mensaje: "Usuario logueado" });
};

sessionsCtrls.renderApiLogOut = (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.clearCookie("jwtCookie");
  res.status(200).send({ resultado: "Usuario deslogueado" });
};

sessionsCtrls.getAuth = (req, res) => {
  res.send(req.user);
};

sessionsCtrls.getUser = (req, res) => {
  res.send(req.user);
};

export default sessionsCtrls;
