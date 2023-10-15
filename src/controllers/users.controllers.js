import { userModel } from "../models/users.models.js";
const usersCtrls = {};

/*************************************** VISTAS ***************************************/
//TRAER TODOS LOS USUARIOS
//TRAER UN USUARIO
// EDITAR UN USUARIO
//ELIMINAR UN USUARIO
/************************************** API ***************************************/
//Todos los usuarios
usersCtrls.renderApiAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({ respuesta: "OK", mensaje: users });
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

//Un usuario
usersCtrls.renderUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({ respuesta: "Error", mensaje: "User not Found" });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

//Crea un usuario
usersCtrls.renderCreateNewUser = async (req, res) => {
  const { first_name, last_name, age, email, password, rol } = req.body;
  try {
    const respuesta = await userModel.create({
      first_name,
      last_name,
      age,
      email,
      password,
      rol,
    });
    res.status(200).send({ respuesta: "OK", mensaje: respuesta });
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
}; //va en sesions

//Edita un usuario
usersCtrls.renderUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age, email, password } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(id, {
      first_name,
      last_name,
      age,
      email,
      password,
    });
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({ respuesta: "Error", mensaje: "User not Found" });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

//Elimina un usuario
usersCtrls.renderDeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.status(200).send({ respuesta: "OK", mensaje: user });
    } else {
      res.status(404).send({ respuesta: "Error", mensaje: "User not Found" });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};

export default usersCtrls;
