import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./Items";

export default async function ShopPage() {
    const userProgressData = getUserProgress();

    const [userProgress] = await Promise.all([
        userProgressData
    ])

    if (!userProgress || !userProgress.activeCourse) redirect("/courses");

    return (
        <div className="flex flex-row-reverse gap-12 px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>

            <FeedWrapper>
                <div className="flex flex-col items-center w-full">
                    <Image
                        src="/shop.svg"
                        alt="shop"
                        height={90}
                        width={90}
                    />

                    <h1 className="text-center text-2xl font-bold my-6 text-neutral-800">
                        Loja
                    </h1>

                    <p className="text-center text-lg mb-6 text-muted-foreground">
                        Gaste seus pontos em coisas legais.
                    </p>

                    <Items
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                        hasActiveSubscription={false}
                    />
                </div>
            </FeedWrapper>
        </div>
    )
}
