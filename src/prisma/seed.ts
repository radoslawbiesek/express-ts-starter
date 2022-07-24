import bcrypt from 'bcrypt';
import prisma from './client';

async function main() {
  const password = await bcrypt.hash('password', 12);
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password,
    },
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
