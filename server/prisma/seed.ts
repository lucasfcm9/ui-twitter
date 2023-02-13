import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstTweetId = '6781ed09-3eed-4124-8297-5b6601bb6a5a8'
const secondTweetId = '30def59e-969e-4aeb-aa5b-8db4e6837363'
const thirdTweetId = 'fbd9ee2e-4322-4956-bcff-45259c4fbdb0'

async function run() {
  await prisma.tweet.deleteMany()

  /**
   * Create tweets
   */
  await Promise.all([
    prisma.tweet.create({
      data: {
        id: firstTweetId,
        content: 'First tweet',
        createdAt: new Date('2023-02-13T03:00:00.000z'),
      },
    }),
    prisma.tweet.create({
      data: {
        id: secondTweetId,
        content: 'Hoje eu tenho aula de prisma',
        createdAt: new Date('2023-02-13T03:00:00.000z'),
      },
    }),
    prisma.tweet.create({
      data: {
        id: thirdTweetId,
        content: 'Tá na hora de beber água',
        createdAt: new Date('2023-02-12T03:00:00.000z'),
      },
    }),
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
