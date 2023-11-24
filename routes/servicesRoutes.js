const express = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const router = express.Router();
const {getService, getServiceById, postService, putService, deleteService} = require('../controllers/serviceControllers')
  
const checkScopesRead = requiredScopes('read:services');
const checkScopesWrite = requiredScopes('write:services');

router.get("/:id/servicios",checkScopesRead, getService);

router.get("/:id/servicios/:idService",checkScopesRead, getServiceById);

router.post("/:id/servicios",checkScopesWrite, postService);

router.put("/:id/servicios/:idService",checkScopesWrite, putService);

router.delete("/:id/servicios/:idService",checkScopesWrite, deleteService);


module.exports = router;