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
    }

    res.redirect("/static/signin", 200, { resultado: "Usuario creado" });
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
    //redirect
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
  res.status(200).send({ resultado: "Usuario deslogueado" });
};

export default sessionsCtrls;
