import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { SignInController } from "./controllers/signin.controller";
import Container from "typedi";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");

dotenv.config();

useContainer(Container);

const app = createExpressServer({
  cors: {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type,Authorization", // Cabeçalhos permitidos
    exposedHeaders: ["Content-Length", "X-Foo"], // Cabeçalhos expostos
    credentials: true, // Permitir credenciais
    maxAge: 3600, // Tempo de cache da preflight request em segundos
    preflightContinue: false, // Responder automaticamente às solicitações de preflight
  },
  controllers: [SignInController], // we specify controllers we want to use
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(process.env.VERCEL_DB_CONNECTION as string);

app.listen(8080, () => console.log("Servidor Rodando"));
