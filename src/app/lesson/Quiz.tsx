"use client"

import { challengeOptions, challenges } from "@/db/schema"
import { useState } from "react";
import { Header } from "./Header";
import { QuestionBubble } from "./(components)/QuestionBubble";
import { Challenge } from "./(components)/Challenge";
import { Footer } from "./Footer";

interface QuizProps {
    initialLessonId: number
    initialLessonChallenges: (typeof challenges.$inferSelect & { completed: boolean; challengeOptions: typeof challengeOptions.$inferSelect[] })[]
    initialHearts: number
    initialPercentage: number
    userSubscription: any;
}

export function Quiz({ initialLessonId, initialHearts, initialLessonChallenges, initialPercentage, userSubscription }: QuizProps) {
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage)
    const [challenges] = useState(initialLessonChallenges)
    const [selectedOption, setSelectedOption] = useState<number>()
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)

        return uncompletedIndex === -1 ? 0 : uncompletedIndex
    })

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const title = challenge.type === "ASSIST" ? "Selecione a resposta correta" : challenge.question;

    function onSelect(id: number) {
        if (status !== "none") return;

        setSelectedOption(id);
    }

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />

            <div className="flex-1">
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>

                        <div>
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble
                                    question={challenge.question}
                                />
                            )}

                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={false}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer
                disabled={!selectedOption}
                status={status}
                onCheck={() => {}}
            />
        </>
    )
}
