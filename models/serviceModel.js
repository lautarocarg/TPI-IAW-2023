const mongoose = require('mongoose')
const Joi = require("joi");

const serviceSchemaValidator = Joi.object().keys({
    nombre: Joi.string().min(3).max(30).required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "any.required":
            err.message = "Debe contener el campo 'Nombre'";
            break;
          case "string.base":
              err.message = "Debe contener solo caracteres";
              break;
          case "any.empty":
            err.message = "No puede estar vacio";
            break;
          case "string.min":
            err.message = `Debe ser de al menos ${err.local.limit} caracteres`;
            break;
          case "string.max":
            err.message = `Como máxmimo deben ser ${err.local.limit} caracteres`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  
    descripcion: Joi.string().min(3).max(300).required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "any.required":
            err.message = "Debe contener el campo 'descripcion'";
            break;
          case "string.base":
              err.message = "Debe contener solo caracteres";
              break;
          case "any.empty":
            err.message = "No puede estar vacio";
            break;
          case "string.min":
            err.message = `Debe ser de al menos ${err.local.limit} caracteres`;
            break;
          case "string.max":
            err.message = `Como máxmimo deben ser ${err.local.limit} caracteres`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  
    precio: Joi.number().precision(2).required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "any.required":
            err.message = "Debe contener el campo 'precio'";
            break;
          case "any.empty":
            err.message = "No puede estar vacio";
            break;
          case "number.base":
            err.message = "Debe ser un número el precio";
            break;
          case "number.precision":
            err.message = 'Debe tener como maximo 2 decimales';
            break;
          default:
            break;
        }
      });
      return errors;
    }),

  });

const servideSchema = mongoose.Schema(
    {
        id_proveedor: {
            type: mongoose.Types.ObjectId, ref: 'Proveedor',
            required: true,
        },
        nombre: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        descripcion: {
            type: String,
            required:  [true, "Por favor ingrese una descripción del proveedor"],
        },
        precio: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: false,
        versionKey: false
    }
)


const Service = mongoose.model('Servicios', servideSchema);

module.exports = {Service, serviceSchemaValidator};