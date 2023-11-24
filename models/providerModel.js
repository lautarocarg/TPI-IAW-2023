const mongoose = require('mongoose')
const Joi = require("joi");

const providerSchemaValidator = Joi.object().keys({
    nombre: Joi.string().min(3).max(30).required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "any.required":
            err.message = "Debe contener el campo 'nombre'";
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
  
    descripcion: Joi.string().min(3).max(30).required().error(errors => {
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
    })
  });

const providerSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required:  true
        }
    },
    {
        timestamps: false,
        versionKey: false
    }
)


const Provider = mongoose.model('Proveedor', providerSchema);

module.exports = {Provider, providerSchemaValidator};