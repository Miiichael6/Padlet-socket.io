import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true, nullable: false })
  email: string;

  @Column({ type: "text", unique: false, nullable: false })
  firstname: string;

  @Column({ type: "text", unique: false, nullable: false })
  lastname: string;

  @Column({ type: "text", unique: false, nullable: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user, { onDelete: "CASCADE" })
  posts?: Post[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
