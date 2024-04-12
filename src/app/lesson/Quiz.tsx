"use client"

import { challengeOptions, challenges } from "@/db/schema"
import { useState } from "react";
import { Header } from "./Header";

interface QuizProps {
    initialLessonId: number
    initialLessonChallenges: (typeof challenges.$inferSelect & { completed: boolean; challengeOptions: typeof challengeOptions.$inferSelect[] })[]
    initialHearts: number
    initialPercentage: number
    userSubscription: any;
}

export function Quiz({ initialLessonId, initialHearts, initialLessonChallenges, initialPercentage, userSubscription }: QuizProps) {
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(50 || initialPercentage)

    return (
        <Header
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubscription?.isActive}
        />
    )
}
