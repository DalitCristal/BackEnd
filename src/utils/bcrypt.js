import "dotenv/config";
import bcrypt from "bcrypt";

export const encrypPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));

//const passwordEnc = encrypPassword("coderhouse");

export const validatePassword = (passwordSend, passwordBDD) =>
  bcrypt.compareSync(passwordSend, passwordBDD);

//console.log(validatePassword("coderhous", passwordEnc));
