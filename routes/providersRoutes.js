const express = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const router = express.Router();
const { getProvider, getProviderById, postProvider, putProvider, deleteProvider} = require ('../controllers/providerControllers')
  
const checkScopesRead = requiredScopes('read:providers');
const checkScopesWrite = requiredScopes('write:providers');

router.get("/",checkScopesRead, getProvider);

router.get("/:id",checkScopesRead, getProviderById);

router.post("/",checkScopesWrite, postProvider);

router.put("/:id",checkScopesWrite, putProvider);

router.delete("/:id",checkScopesWrite, deleteProvider);


module.exports = router;