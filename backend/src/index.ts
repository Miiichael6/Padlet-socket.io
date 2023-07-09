import { Server as SocketServer } from "socket.io";
import httpServer from "./app";
import socketsRoom from "./sockets/main";
import { AppDataSource } from "./database/db";

const runServer = async () => {
  await AppDataSource.initialize();
  console.log("database connected")
  const onPort = process.env.PORT || 4000;
  const io = new SocketServer(httpServer);

  // configuración de sockets
  socketsRoom(io);

  httpServer.listen(onPort);
  console.log(`Server on port http://localhost:${onPort}`);
};

runServer();
