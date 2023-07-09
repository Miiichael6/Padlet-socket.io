import { Server } from "socket.io";
import fs from "fs";
import path from "path";

const socketFolder = path.join(__dirname);

const socketsRoom = (io: Server): any => {
  fs.readdir(socketFolder, (error, files) => {
    // ! verificar si hay un error
    if (error) {
      console.error("Error al leer la carpeta:", error);
      return;
    }

    const myFiles = files.filter(
      (file) => file !== "main.ts" && file !== ("main.js" as string)
    );

    for (let i = 0; i < myFiles.length; i++) {
      const file = myFiles[i];
      const fileExtension = file.split(".")[1];

      if (fileExtension === "ts" || fileExtension === "js") {
        continue;
      }
      throw new Error(
        `File named "${file}" needs to have a .js or .ts file extension, if this is an error please remove it and reload the server`
      );
    }

    myFiles.forEach((file) => {
      const filePath = path.join(socketFolder, file);
      const socketModule = require(filePath);
      if (typeof socketModule.default === "function") {
        socketModule.default(io);
      }
    });
  });
};

export default socketsRoom;
