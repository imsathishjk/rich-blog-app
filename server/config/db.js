import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
export const prisma = new PrismaClient({ adapter });


// const connectDB = async () => {
//     try {
//         await prisma.$connect();
//         console.log('DB Connected');
//     } catch (err) {
//         console.log('error in conencting DB')
//         await prisma.$disconnect();
//     }
// }
