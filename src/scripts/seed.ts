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
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeProgress)

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
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unidade 1",
                description: "Aprender o básico de Espanhol",
                order: 1
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Substantivos",
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Verbs",
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Substantivos",
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Verbs",
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Substantivos",
            },
            {
                id: 6,
                unitId: 1,
                order: 6,
                title: "Verbs",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Qual desses é "o homem"?',
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: '"o homem"?',
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'Qual desses é "o zumbi"?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                imageSrc: "/boy.svg",
                correct: true,
                text: "El hombre",
                audioSrc: "/es_boy.mp3"
            },
            {
                challengeId: 1,
                imageSrc: "/girl.svg",
                correct: false,
                text: "La mujer",
                audioSrc: "/es_girl.mp3"
            },
            {
                challengeId: 1,
                imageSrc: "/zombie.svg",
                correct: false,
                text: "El zombie",
                audioSrc: "/es_zombie.mp3"
            }
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2,
                correct: true,
                text: "El hombre",
                audioSrc: "/es_boy.mp3"
            },
            {
                challengeId: 2,
                correct: false,
                text: "La mujer",
                audioSrc: "/es_girl.mp3"
            },
            {
                challengeId: 2,
                correct: false,
                text: "El zombie",
                audioSrc: "/es_zombie.mp3"
            }
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                imageSrc: "/boy.svg",
                correct: false,
                text: "El hombre",
                audioSrc: "/es_boy.mp3"
            },
            {
                challengeId: 3,
                imageSrc: "/girl.svg",
                correct: false,
                text: "La mujer",
                audioSrc: "/es_girl.mp3"
            },
            {
                challengeId: 3,
                imageSrc: "/zombie.svg",
                correct: true,
                text: "El zombie",
                audioSrc: "/es_zombie.mp3"
            }
        ]);

        console.log("Seeding finished")
    } catch (error) {
        console.error(error)

        throw new Error("Failed to seed the database");
    }
}

main();