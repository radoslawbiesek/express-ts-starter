import prisma from './client';

import { createUser } from '../auth/controllers';

async function main() {
  const user = await createUser({
    email: 'admin@example.com',
    password: 'password',
  });
  console.log(`Created user with id: ${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
