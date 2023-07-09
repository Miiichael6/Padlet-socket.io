import express, { Express } from "express";
import http from "http";
import router from "./router/main.router";

// initialize express server
const app: Express = express();

// static Server
app.use(express.json());

app.use("/api", router);

// config "http server" for socket.io;
const httpServer = http.createServer(app);

export default httpServer;
