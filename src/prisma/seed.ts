import prisma from './client';

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'password',
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
