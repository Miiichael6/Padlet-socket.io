import { Server, Socket } from "socket.io";
import { Post as PostRepository } from "../entities/Post";

const postSockets = (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    console.log("server client connected")
    // socket.emit("server:posts", );
    const getAllPosts = async () => {
      const posts = await PostRepository.find({});
      return posts;
    };

    const data = await getAllPosts()
    console.log(data)

    io.emit("server:all-posts", await getAllPosts());

    socket.off("disconnect", () => {
      console.log("disconnect");
    });
  });
};

export default postSockets;
