// import "dotenv/config";
// import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from '@prisma/client'

// const connectionString = `${process.env.DATABASE_URL}`
// const adapter = new PrismaPg({ connectionString })
// export const prisma = new PrismaClient({ adapter });


// import "dotenv/config";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis;

// export const prisma =
//     globalForPrisma.prisma ||
//     new PrismaClient({
//         adapter: new PrismaPg({
//             connectionString: process.env.DATABASE_URL_POOLED,
//         }),
//     });

// if (process.env.NODE_ENV !== "production") {
//     globalForPrisma.prisma = prisma;
// }

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}


// const connectDB = async () => {
//     try {
//         await prisma.$connect();
//         console.log('DB Connected');
//     } catch (err) {
//         console.log('error in conencting DB')
//         await prisma.$disconnect();
//     }
// }
