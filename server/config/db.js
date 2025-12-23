import "dotenv/config";
// import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from '@prisma/client'

// const connectionString = `${process.env.DATABASE_URL}`
// const adapter = new PrismaPg({ connectionString })
// const prisma = new PrismaClient({ adapter });


// const connectDB = async () => {
//     try {
//         await prisma.$connect();
//         console.log('DB Connected');
//     } catch (err) {
//         console.log('error in conencting DB')
//         await prisma.$disconnect();
//     }
// }

// export { prisma, connectDB };




// import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const isProd = process.env.NODE_ENV === "production";

const connectionString = isProd
    ? `${process.env.DATABASE_URL}?sslmode=require`
    : process.env.DATABASE_URL;


const adapter = new PrismaPg({
    connectionString,
});

const globalForPrisma = globalThis;

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        log: ["error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
// 