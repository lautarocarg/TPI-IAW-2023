const {Service, serviceSchemaValidator} = require("../models/serviceModel");
const {Provider} = require("../models/providerModel");
const { HttpStatusCodes, sendResponse } = require("../middleware/httpHelper");

/**
 * Obtiene todos los servicios.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const getService = async (req, res) => {
  try {
    const idProvider = req.params.id;
    if(idProvider.length !== 24){
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `El ID del proveedor debe ser de 24 caracteres` });
    }
    const provider = await Provider.findById(idProvider);
    if (!provider) {
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe proveedor con el ID ${idProvider}` });
    }

    const service = await Service.find({'id_proveedor': idProvider});
    if (service.length === 0) {
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe servicio para el proveedor ID ${idProvider}` });
  }

    return sendResponse(res, HttpStatusCodes.OK, service);
  } catch (error) {
    error.message = "Hubo un problema con la base de datos";
    return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: error.message });
  }
};

/**
 * Obtiene un servicio por su ID.
 * @param {object} req - Objeto de solicitud HTTP con el parámetro "id".
 * @param {object} res - Objeto de respuesta HTTP.
 */
const getServiceById = async (req, res) => {
  try {
    const idProvider = req.params.id;
    if(idProvider.length !== 24){
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `El ID del proveedor debe ser de 24 caracteres` });
    }
    
    const provider = await Provider.findById(idProvider);
    if (!provider) {
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe proveedor con el ID ${idProvider}` });
    }
    
    const idService = req.params.idService;
    const service = await Service.find({"_id": idService,"id_proveedor": idProvider});

    if (service.length === 0) {
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existen servicios con el ID ${idService}` });
    }
    return sendResponse(res, HttpStatusCodes.OK, service);
  } catch (error) {
    error.message = "Hubo un problema con la base de datos";
    return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: error.message });
  }
};

/**
 * Crea un nuevo servicio.
 * @param {object} req - Objeto de solicitud HTTP con los datos del provedor en el cuerpo.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const postService = async (req, res) => {
  try {

    const { error, value } = serviceSchemaValidator.validate(req.body);
    if(error){
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `${error}` });
    }
    const idProvider = req.params.id;
    if(idProvider.length !== 24){
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `El ID del proveedor debe ser de 24 caracteres` });
    }

    const provider = await Provider.findById(idProvider);
    if (!provider) {
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe proveedor con el ID ${idProvider}` });
    }

    let serviceObject = req.body;
    serviceObject['id_proveedor'] = idProvider

    const service = await Service.create(serviceObject);
    return sendResponse(res, HttpStatusCodes.CREATED, service);
  } catch (error) {
    error.message = "Hubo un problema con la base de datos.";
    return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: error.message });
  }
};

/**
 * Actualiza un servicio por su ID.
 * @param {object} req - Objeto de solicitud HTTP con el parámetro "id" y los datos del Service en el cuerpo.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const putService = async (req, res) => {
  try {
    const { error, value } = serviceSchemaValidator.validate(req.body);
    if(error){
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `${error}` });
    }

    const idProvider = req.params.id;
    if(idProvider.length !== 24){
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `El ID del proveedor debe ser de 24 caracteres` });
    }
    
    const provider = await Provider.findById(idProvider);
    if (!provider) {
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe proveedor con el ID ${idProvider}` });
    }

    const idService = req.params.idService;
    const service = await Service.findByIdAndUpdate({"_id": idService,"id_proveedor": idProvider}, req.body);
    if (service.length === 0) {
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe Service con el ID ${idService}` });
    }
    const serviceUpdated = await Service.findById(idService)
    return sendResponse(res, HttpStatusCodes.OK, { message: serviceUpdated });
  } catch (error) {
    error.message = "Hubo un problema con la base de datos";
    return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: error.message });
  }
};

/**
 * Elimina un servicio por su ID.
 * @param {object} req - Objeto de solicitud HTTP con el parámetro "id".
 * @param {object} res - Objeto de respuesta HTTP.
 */
const deleteService = async (req, res) => {
  try {

    const idProvider = req.params.id;
    if(idProvider.length !== 24){
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `El ID del proveedor debe ser de 24 caracteres` });
    }
    
    const provider = await Provider.findById(idProvider);
    if (!provider) {
      return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe proveedor con el ID ${idProvider}` });
    }
    
    const idService = req.params.idService;
    const service = await Service.findByIdAndDelete({"_id": idService,"id_proveedor": idProvider});
    if (service.length === 0) {
        return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: `No existe Service con el ID ${idService}` });
    }
    return sendResponse(res, HttpStatusCodes.OK, { message: `El Service con ID: ${idService} fue eliminado` });
  } catch (error) {
    error.message = "Hubo un problema con la base de datos";
    return sendResponse(res, HttpStatusCodes.BAD_REQUEST, { message: error.message });
  }
};

module.exports = {
  getService,
  getServiceById,
  postService,
  putService,
  deleteService,
};
