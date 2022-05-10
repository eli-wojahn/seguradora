const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");
const MarcasController = require("./controllers/MarcasController");
const CarrosController = require("./controllers/CarrosController");
const SeguradoraController = require("./controllers/SeguradoraController");

const login = require("./middlewares/login");

routes.get("/usuarios", UsuarioController.index)
      .post("/usuarios", login, UsuarioController.store)
      .post("/login", UsuarioController.login)
      .get("/senhas", login, UsuarioController.senhas);

routes.get("/marcas", MarcasController.index)
      .post("/marcas", MarcasController.store);

routes.get("/carros", CarrosController.index)
      .post("/carros", CarrosController.store)
      .put("/carros/:id", CarrosController.update)
      .delete("/carros", CarrosController.destroy)
      .put("/carros/destaque/:id", CarrosController.destaque)
      .get("/carros/destaque", CarrosController.mostra_destaque);

routes.get("/seguradora", SeguradoraController.index)
      .post("/seguradora", SeguradoraController.store)
      .put("/seguradora/:id", SeguradoraController.update)
      .delete("/seguradora/:id", SeguradoraController.destroy)
      .get("/seguradora/estatisticas", SeguradoraController.dados);

module.exports = routes;