import { User } from "@prisma/client";

import { prisma } from "@/utils/prisma";

export const UserServices = {
  createUser: async (user: Pick<User, "name" | "email" | "password">) => {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return newUser;
  },
};
