const Repairs = require('../models/repairs.model');

exports.findRepairs = async (req, res) => {
  const time = req.requestTime;

  const repairs = await Repairs.findAll({
    where: {
      status: true,
    },
  });

  return res.json({
    requestTime: time,
    results: repairs.length,
    status: 'success',
    message: 'User found',
    repairs,
  });
};

exports.updateRepairs = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `Repair with id: ${id} not found`,
      });
    }

    await repair.update({ completed });

    return res.status(200).json({
      status: 'success',
      message: 'The repair has been updated',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};

exports.createRepairs = async (req, res) => {
  try {
    // PASO 1: OBTENER INFORMACION A CREAR DE LA REQ.BODY
    const { date, userId } = req.body;

    //PASO 2: CREAR EL PRODUCTO UTILIZANDO EL MODELO

    const repair = await Repairs.create({
      date,
      userId,
    });

    // PASO 3: ENVIAR UNA RESPUESTA AL CLIENTE

    return res.status(201).json({
      message: 'The repair has been created!',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.findRepairs = async (req, res) => {
  try {
    //? 1. NOS TRAEMOS EL ID DE LOS PARAMETROS
    const { id } = req.params; //DESTRUCION DE OBJETOS

    //? 2. BUSCO EL PRODUCTO EN LA BASE DE DATOS
    const repair = await Repairs.findOne({
      where: {
        userId,
        status: true,
      },
    });

    //? 3. VALIDAR SI EL PRODUCTO EXISTE, SI NO, ENVIAR UN ERROR 404
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `The userId with id: ${id} not found!`,
      });
    }

    //? 4. ENVIAR LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: 'success',
      message: 'Repair found',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.deleteRepairs = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `Repair with id: ${id} not found`,
      });
    }

    await repair.update({ status: 'canceled' });

    return res.status(200).json({
      status: 'success',
      message: 'The repair has been canceled',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};