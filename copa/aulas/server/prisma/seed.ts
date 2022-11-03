import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/gabrielsouzaleite.png',
    }
  })
  
  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,
      participant: {
        create:{
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-04T12:00:00.010Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-06T12:00:00.010Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
      guesses: {
        create: {
          firsTeamPoints: 2,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_poolId:{
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

main()