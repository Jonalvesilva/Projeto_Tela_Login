import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { SignInController } from "./controllers/signin.controller";
import Container from "typedi";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser = require("body-parser");
dotenv.config();

useContainer(Container);

const app = createExpressServer({
  cors: true,
  controllers: [SignInController], // we specify controllers we want to use
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECTION as string);

app.listen(3000, () => console.log("Servidor Rodando"));
