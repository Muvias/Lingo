import { FeedWrapper } from "@/components/FeedWrapper";
import { Promo } from "@/components/Promo";
import { Quests } from "@/components/Quests";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LeaderboardPage() {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const leaderboardData = getTopTenUsers();

    const [userProgress, userSubscription, leaderboard] = await Promise.all([
        userProgressData,
        userSubscriptionData,
        leaderboardData
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

                <Quests points={userProgress.points} />
            </StickyWrapper>

            <FeedWrapper>
                <div className="flex flex-col items-center w-full">
                    <Image
                        src="/leaderboard.svg"
                        alt="Classificação"
                        height={90}
                        width={90}
                    />

                    <h1 className="text-center text-2xl font-bold my-6 text-neutral-800">
                        Classificação
                    </h1>

                    <p className="text-center text-lg mb-6 text-muted-foreground">
                        Veja como você está comparado a outros estudantes.
                    </p>

                    <Separator className="h-0.5 mb-4 rounded-full" />

                    {leaderboard.map((user, index) => (
                        <div
                            key={user.userId}
                            className="flex items-center w-full py-2 px-4 rounded-xl hover:bg-gray-200/50"
                        >
                            <span className="font-bold mr-4 text-lime-700">
                                {index + 1}
                            </span>

                            <Avatar
                                className="h-12 w-12 ml-3 mr-6 border bg-green-500"
                            >
                                <AvatarImage
                                    src={user.userImageSrc}
                                    className="object-cover"
                                />
                            </Avatar>

                            <p className="flex-1 font-bold text-neutral-800">
                                {user.userName}
                            </p>

                            <span className="text-muted-foreground font-medium">
                                {user.points} XP
                            </span>
                        </div>
                    ))}
                </div>
            </FeedWrapper>
        </div>
    )
}
