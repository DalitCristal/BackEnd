import "dotenv/config";
import bcrypt from "bcrypt";

export const encryptPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));

//const passwordEnc = encryptPassword("coderhouse");

export const validatePassword = (passwordSend, passwordBDD) =>
  bcrypt.compareSync(passwordSend, passwordBDD);

//console.log(validatePassword("coderhous", passwordEnc));
