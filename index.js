require('dotenv').config()

const express = require("express");
const providersRoute = require('./routes/providersRoutes');
const servicesRoute = require('./routes/servicesRoutes');
const errorHandler = require("./middleware/errorHandler");
const { auth } = require('express-oauth2-jwt-bearer');

const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 4200;


// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUERBASEURL,
  tokenSigningAlg: process.env.TOKENALG, 
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Ruta base
app.get("/", (req, res) => {
  res.send("API de Proveedores");
});

app.use('/proveedores', checkJwt, providersRoute);
app.use('/proveedores', checkJwt, servicesRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

mongoose.set("strictQuery", false)
mongoose.
connect(process.env.MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(4000, ()=> {
        console.log(`Node API app is running on port 4000`)
    });
}).catch((error) => {
    console.log(error)
})