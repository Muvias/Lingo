import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/FeedWrapper";
import { Promo } from "@/components/Promo";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { Quests } from "@/components/Quests";

import { Header } from "./Header";
import { Unit } from "./Unit";

export default async function Page() {
    const userProgressData = getUserProgress()
    const courseProgressData = getCourseProgress()
    const lessonPercentageData = getLessonPercentage()
    const unitsData = getUnits()
    const userSubscriptionData = getUserSubscription()

    const [userProgress, courseProgress, lessonPercentage, units, userSubscription] = await Promise.all([
        userProgressData,
        courseProgressData,
        lessonPercentageData,
        unitsData,
        userSubscriptionData
    ])

    if (!userProgress || !userProgress.activeCourse || !courseProgress) {
        redirect("/courses")
    }

    const hasSubscription = !!userSubscription?.isActive;

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
                <Header title={userProgress.activeCourse.title} />

                {units.map((unit) => (
                    <div
                        key={unit.id}
                        className="mb-10"
                    >
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    )
}
