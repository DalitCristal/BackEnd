import "dotenv/config";
import bcrypt from "bcrypt";

export const encryptPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));

export const validatePassword = (passwordSend, passwordBDD) =>
  bcrypt.compareSync(passwordSend, passwordBDD);
