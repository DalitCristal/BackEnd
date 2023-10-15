import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
  return token;
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Usuario no autenticado" });
  }

  const token = authHeader.split(" ")[1];

  jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
    if (error) {
      return res
        .status(403)
        .send({ error: "Usuario no autorizado, token invalido" });
    }
  });

  req.user = credential.user;
  next();
};
