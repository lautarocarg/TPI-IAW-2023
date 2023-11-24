const {Provider, providerSchemaValidator} = require("../models/providerModel");
const {Service} = require("../models/serviceModel");
const { HttpStatusCodes, sendResponse } = require("../middleware/httpHelper");

/**
 * Obtiene todos los Provider.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const getProvider = async (req, res) => {
  try {
    const providers = await Provider.find({});
    return sendResponse(res, HttpStatusCodes.OK, providers);
  } catch (error) {
    error.message = "Hubo un problema con la base de datos";
    return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: error.message });
  }
};

/**
 * Obtiene un proveedor por su ID.
 * @param {object} req - Objeto de solicitud HTTP con el parámetro "id".
 * @param {object} res - Objeto de respuesta HTTP.
 */
const getProviderById = async (req, res) => {
  try {
    const id = req.params.id;
    if(id.length !== 24){
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `El ID del proveedor debe ser de 24 caracteres` });
    }
    const provider = await Provider.findById(id);
    if (!provider) {
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe proveedor con el ID ${id}` });
    }
    return sendResponse(res, HttpStatusCodes.OK, provider);
  } catch (error) {
    error.message = "Hubo un problema con la base de datos";
    return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: error.message });
  }
};

/**
 * Crea un nuevo proveedor.
 * @param {object} req - Objeto de solicitud HTTP con los datos del provedor en el cuerpo.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const postProvider = async (req, res) => {
  try {
    const { error, value } = providerSchemaValidator.validate(req.body);
    if(error){
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `${error}` });
    }
    const provider = await Provider.create(req.body);
    return sendResponse(res, HttpStatusCodes.CREATED, provider);
  } catch (error) {
    error.message = "Hubo un problema con la base de datos";
    return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: error.message });
  }
};

/**
 * Actualiza un Provider por su ID.
 * @param {object} req - Objeto de solicitud HTTP con el parámetro "id" y los datos del Provider en el cuerpo.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const putProvider = async (req, res) => {
  try {
    const { error, value } = providerSchemaValidator.validate(req.body);
    if(error){
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `${error}` });
    }
    const idProvider = req.params.id;
    if(idProvider.length !== 24){
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `El ID del proveedor debe ser de 24 caracteres` });
    }

    const provider = await Provider.findByIdAndUpdate(idProvider, req.body);
    if (!provider) {
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe Provider con el ID ${idProvider}` });
    }
    const providerUpdated = await Provider.findById(idProvider)
    return sendResponse(res, HttpStatusCodes.OK, { message: providerUpdated });
  } catch (error) {
    error.message = "Hubo un problema con la base de datos";
    return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: error.message });
  }
};


// if(validateProvider(body)) return

// function validateProvider(res){
//   const { error, value } = providerSchemaValidator.validate(res.body);
//   if(error){
//       sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `${error}` });
//       return true
//   }

//   return false
// }

/**
 * Elimina un Provider por su ID.
 * @param {object} req - Objeto de solicitud HTTP con el parámetro "id".
 * @param {object} res - Objeto de respuesta HTTP.
 */
const deleteProvider = async (req, res) => {
  try {
    const id = req.params.id;
    if(id.length !== 24){
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `El ID del proveedor debe ser de 24 caracteres` });
    }
    const provider = await Provider.findByIdAndDelete(id);
    if (!provider) {
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe Provider con el ID ${id}` });
    }
    const service = await Service.deleteMany({"id_proveedor": id});
    return sendResponse(res, HttpStatusCodes.OK, { message: `El Provider con ID: ${id} fue eliminado` });
  } catch (error) {
    error.message = "Hubo un problema con la base de datos";
    return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: error.message });
  }
};

module.exports = {
  getProvider,
  getProviderById,
  postProvider,
  putProvider,
  deleteProvider,
};
