// Node module to seed the database with data.
const { PrismaClient } = require('@prisma/client') // require (like in regular node.js)

const db = new PrismaClient() // instantiate a new PrismaClient

async function main() {

    // first try & get the categories
    try {
        await db.category.createMany({
            data: [
                { name: "Entrepenurs"},
                { name: "Scientists"},
                { name: "Inventors"},
                { name: "Athletes"},
                { name: "Musicians"},
                { name: "Actors"},
                { name: "World Leaders"},
                { name: "Historic Figures"},
            ]
        })

    // if that doesn't work, catch the error    
    } catch (error) {
        console.error("Error seeding database: ", error)

    // finally, disconnect from the database
    } finally {
        await db.$disconnect()
    }
}

main();