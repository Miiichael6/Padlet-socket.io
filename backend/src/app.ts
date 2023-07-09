import express, { Express } from "express";
import http from "http";
import router from "./router/main.router";
import { corsOptions } from "./config/cors-config";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// initialize express server
const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

// config "http server" for socket.io;
const httpServer = http.createServer(app);

export default httpServer;
