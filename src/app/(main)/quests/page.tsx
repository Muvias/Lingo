import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { Progress } from "@/components/ui/progress";
import { Promo } from "@/components/Promo";
import { quests } from "@/constants";

export default async function QuestsPage() {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [userProgress, userSubscription] = await Promise.all([
        userProgressData,
        userSubscriptionData
    ])

    if (!userProgress || !userProgress.activeCourse) redirect("/courses");

    const hasSubscription = !!userSubscription?.isActive

    return (
        <div className="flex flex-row-reverse gap-12 px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={hasSubscription}
                />

                {!hasSubscription &&
                    <Promo />
                }
            </StickyWrapper>

            <FeedWrapper>
                <div className="flex flex-col items-center w-full">
                    <Image
                        src="/quests.svg"
                        alt="Missões"
                        height={90}
                        width={90}
                    />

                    <h1 className="text-center text-2xl font-bold my-6 text-neutral-800">
                        Missões
                    </h1>

                    <p className="text-center text-lg mb-6 text-muted-foreground">
                        Complete missões ganhando pontos
                    </p>

                    <ul className="w-full">
                        {quests.map((quest) => {
                            const progress = (userProgress.points / quest.value) * 100;

                            return (
                                <div
                                    key={quest.title}
                                    className="flex items-center w-full px-4 gap-x-4 border-t py-8"
                                >
                                    <Image
                                        src="/points.svg"
                                        alt="pontos"
                                        height={60}
                                        width={60}
                                    />

                                    <div className="flex flex-col w-full gap-y-2">
                                        <h2 className="text-xl font-bold text-neutral-700">
                                            {quest.title}
                                        </h2>

                                        <Progress
                                            value={progress}
                                            className="h-3"
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    )
}
