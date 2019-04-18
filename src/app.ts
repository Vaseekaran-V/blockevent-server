import * as bodyParser from "body-parser";
import express = require("express");
import * as apiRoutes from "./routes/routes";
import * as dotenv from "dotenv";
import cors from "cors";
import { eventContext } from 'aws-serverless-express/middleware';
const helmet = require('helmet')

dotenv.config();

export function configureApp() {
  const app: express.Application = express();

  const port = process.env.PORT || 7000;
  app.use(helmet())

  app.use(eventContext());

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(cors({


    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }));



  app.use(bodyParser.json({ limit: '50mb' }));



  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use("/api", apiRoutes.router);

  return app;
}
