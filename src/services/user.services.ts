import { User } from "@prisma/client";

import { prisma } from "@/utils/prisma";

export const UserServices = {
  createUser: async (user: Pick<User, "name" | "email" | "password" | "isVerified">) => {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        isVerified: user.isVerified,
      },
    });
    return newUser;
  },
  findUser: async (idOrEmail: string) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            id: idOrEmail,
          },
          {
            email: idOrEmail,
          },
        ],
      },
    });
    return user;
  },
  CreateVerificationCode: async (userId: string, code: string) => {
    await prisma.verificationCode.create({
      data: {
        userId,
        code,
      },
    });
  },
  getAllUsers: async () => {
    const users = await prisma.user.findMany();

    return users;
  },
  banUser: async (userId: string) => {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        onBanned: true,
      },
    });
  },
  unBanUser: async (userId: string) => {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        onBanned: false,
      },
    });
  },
};
