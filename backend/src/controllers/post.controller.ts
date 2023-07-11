import { Request, Response } from "express";
import { Post as PostRepository } from "../entities";
import { handleErrors } from "../utils/handlerErrors";
import { AuthRequest } from "../middlewares/checkAuth.middleware";

export const findAll = async (req: Request, res: Response) => {
  const posts = await PostRepository.find({
    relations: ["user"],
  });

  const dataWithoutTooMuchContent = posts.map((post) => {
    return {
      ...post,
      user: {
        id: post.user.id,
        lastname: post.user.lastname,
        firstname: post.user.firstname,
        email: post.user.email,
        roles: post.user.roles,
      },
    };
  });

  return res.send(dataWithoutTooMuchContent);
};

export const create = async (req: Request, res: Response) => {
  const { title, content, user: userId } = req.body;
  try {
    const post = PostRepository.create({ title, content, user: userId });
    await PostRepository.save(post);

    return res.send(post);
  } catch (error) {
    return res.status(500).send(handleErrors(error));
  }
};

// Controller to get an item by ID
export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await PostRepository.findOneBy({id})

  if(!post) {
    return res.status(404).send({message: `post with Id: ${id} does not exist`})
  }

  return res.send(post)
};

// Controller to update an item by ID
export const updateOne = async (req: Request, res: Response) => {
  // Get the ID from the route parameter
  const { id } = req.params;

  // Get the data from the request body
  const { name, description } = req.body;

  // Logic to update an item by ID in the database
  // ...

  res.send(`Update item by ID: id`);
};

export const removeOne = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { user } = req;

  const postExist = await PostRepository.findOne({
    where: { id: id },
    relations: { user: true },
  });

  if (!postExist) {
    return res
      .status(404)
      .send({ message: `El post with Id ${postExist} does not exist` });
  }

  console.log(user?.id === postExist.user.id)

  if (postExist.user.id !== user!.id) {
    return res.status(401).send({
      message: "You're not allowed to delete a post if this is not yours",
    });
  }

  const postToDelete = await PostRepository.delete(id);

  return res.send({ deleted: true, post: postToDelete });
};
