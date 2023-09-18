// Imports
import { PrismaClient } from '@prisma/client';

// get prisma db to connect to global
declare global {
    var prisma: PrismaClient | undefined;
}

// Connect db to typescript & ensure that it is available to the code to use.
const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

// Export DB
export default prismadb;