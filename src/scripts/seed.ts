import "dotenv/config";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

async function main() {
    try {
        console.log("Seeding database")

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Espanhol",
                imageSrc: "es.svg"
            },
            {
                id: 2,
                title: "Italiano",
                imageSrc: "it.svg"
            },
            {
                id: 3,
                title: "Francês",
                imageSrc: "fr.svg"
            },
            {
                id: 4,
                title: "Croata",
                imageSrc: "hr.svg"
            },
        ])

        console.log("Seeding finished")
    } catch (error) {
        console.error(error)

        throw new Error("Failed to seed the database")
    }
}

main();