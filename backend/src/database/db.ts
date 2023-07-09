import { DataSource } from "typeorm";
import { Post, User } from "../entities";

// conectando base de datos
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  entities: [User, Post],
  
  // logging: true,
  synchronize: process.env.NODE_ENV === "production" ? false : true,
});
