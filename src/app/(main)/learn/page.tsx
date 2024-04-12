import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Header } from "./Header";
import { Unit } from "./Unit";

export default async function Page() {
    const userProgressData = getUserProgress()
    const courseProgressData = getCourseProgress()
    const lessonPercentageData = getLessonPercentage()
    const unitsData = getUnits()

    const [userProgress, courseProgress, lessonPercentage, units] = await Promise.all([
        userProgressData,
        courseProgressData,
        lessonPercentageData,
        unitsData
    ])

    if (!userProgress || !userProgress.activeCourse || !courseProgress) {
        redirect("/courses")
    }

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
