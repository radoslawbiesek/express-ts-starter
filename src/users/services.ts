import bcrypt from 'bcrypt';

import prisma from '../prisma/client';

import { UserDto } from './models';

async function create(userData: UserDto) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
    },
  });

  return user;
}

async function getOne(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export default {
  create,
  getOne,
};
