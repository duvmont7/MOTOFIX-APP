const User = require('../models/user.model');

exports.findUsers = async (req, res) => {
  const time = req.requestTime;

  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  return res.json({
    requestTime: time,
    results: users.length,
    status: 'success',
    message: 'User found',
    users,
  });
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found`,
      });
    }

    await user.update({ name, email });

    return res.status(200).json({
      status: 'success',
      message: 'The user has been updated',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    // PASO 1: OBTENER INFORMACION A CREAR DE LA REQ.BODY
    const { name, email, password, role } = req.body;

    //PASO 2: CREAR EL PRODUCTO UTILIZANDO EL MODELO

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // PASO 3: ENVIAR UNA RESPUESTA AL CLIENTE

    return res.status(201).json({
      message: 'The user has been created!',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    //? 1. NOS TRAEMOS EL ID DE LOS PARAMETROS
    const { id } = req.params; //DESTRUCION DE OBJETOS

    //? 2. BUSCO EL PRODUCTO EN LA BASE DE DATOS
    const user = await User.findOne({
      where: {
        // id: id
        id,
        status: true,
      },
    });

    //? 3. VALIDAR SI EL PRODUCTO EXISTE, SI NO, ENVIAR UN ERROR 404
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The user with id: ${id} not found!`,
      });
    }

    //? 4. ENVIAR LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: 'success',
      message: 'User found',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found`,
      });
    }

    await user.update({ status: 'disabled' });

    return res.status(200).json({
      status: 'success',
      message: 'The user has been deleted',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
