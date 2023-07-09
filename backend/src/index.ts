import { Server as SocketServer } from "socket.io";
import httpServer from "./app";
import socketsRoom from "./sockets/main";

const onPort = process.env.PORT || 4000;
const io = new SocketServer(httpServer);

socketsRoom(io);

httpServer.listen(onPort);
console.log(`Server on port http://localhost:${onPort}`);
