import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/main.router";
import { corsOptions } from "./config/cors-config";
dotenv.config();

// initialize express server
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

// config "http server" for socket.io;
const httpServer = http.createServer(app);

export default httpServer;
