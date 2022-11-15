import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌰 Seeding.')

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatarUrl: 'https://github.com/montteiropedro.png',
    }
  });

  const pool = await prisma.pool.create({
    data: {
      ownerId: user.id,
      title: 'John Doe Pool',
      code: 'BOL123',
      
      participants: {
        create: {
          userId: user.id,
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-10T12:00:00.841Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'DE',
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-11T12:00:00.841Z',
      firstTeamCountryCode: 'KR',
      secondTeamCountryCode: 'JP',
      
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}

main();
