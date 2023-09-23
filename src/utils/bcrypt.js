import "dotenv/config";
import bcrypt from "bcrypt";

export const createHas = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));

//const passwordEnc = createHas("coderhouse");

export const validatePassword = (passwordSend, passwordBDD) =>
  bcrypt.compareSync(passwordSend, passwordBDD);

//console.log(validatePassword("coderhous", passwordEnc));
