"use client"

import { challengeOptions, challenges } from "@/db/schema";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import Confetti from "react-confetti";
import { useAudio, useWindowSize } from "react-use";

import { Footer } from "./Footer";
import { Header } from "./Header";

import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { toast } from "sonner";
import { Challenge } from "./(components)/Challenge";
import { QuestionBubble } from "./(components)/QuestionBubble";
import { ResultCard } from "./(components)/ResultCard";

interface QuizProps {
    initialLessonId: number
    initialLessonChallenges: (typeof challenges.$inferSelect & { completed: boolean; challengeOptions: typeof challengeOptions.$inferSelect[] })[]
    initialHearts: number
    initialPercentage: number
    userSubscription: any;
}

export function Quiz({ initialLessonId, initialHearts, initialLessonChallenges, initialPercentage, userSubscription }: QuizProps) {
    const router = useRouter()

    const { open: openHeartsModal } = useHeartsModal()
    const { width, height } = useWindowSize()

    const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true })
    const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" })
    const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.wav" })

    const [pending, startTransition] = useTransition()

    const [lessonId] = useState(initialLessonId)
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

    if (!challenge) {
        return (
            <>
                {finishAudio}
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                <div className="flex flex-col items-center justify-center gap-y-4 lg:gap-y-8 max-w-lg h-full mx-auto text-center">
                    <Image
                        src="/finish.svg"
                        alt="Finalizado"
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src="/finish.svg"
                        alt="Finalizado"
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />

                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Bom trabalho!
                        <br />
                        Você completou a lição.
                    </h1>

                    <div className="flex items-center w-full gap-x-4">
                        <ResultCard
                            value={challenges.length * 10}
                            variant="points"
                        />
                        <ResultCard
                            value={hearts}
                            variant="hearts"
                        />
                    </div>
                </div>

                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        )
    }

    const title = challenge.type === "ASSIST" ? "Selecione a resposta correta" : challenge.question;

    function onNext() {
        setActiveIndex((current) => current + 1)
    }

    function onSelect(id: number) {
        if (status !== "none") return;

        setSelectedOption(id);
    }

    function onContinue() {
        if (!selectedOption) return;

        if (status === "wrong") {
            setStatus("none")
            setSelectedOption(undefined)

            return;
        }

        if (status === "correct") {
            onNext()

            setStatus("none")
            setSelectedOption(undefined)

            return;
        }

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) return;

        if (correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();

                            return;
                        }

                        correctControls.play()
                        setStatus("correct")
                        setPercentage((prev) => prev + 100 / challenges.length)

                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 5))
                        }
                    }).catch(() => toast.error("Alguma coisa deu errado! Por favor tente novamente."))
            })
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();

                            return;
                        }

                        incorrectControls.play()
                        setStatus("wrong")

                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0))
                        }
                    }).catch(() => toast.error("Alguma coisa deu errado! Por favor tente novamente."))
            })
        }
    }

    return (
        <>
            {incorrectAudio}
            {correctAudio}

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
                                disabled={pending}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    )
}
