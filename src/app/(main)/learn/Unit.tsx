import { lessons, units } from "@/db/schema"
import { UnitBanner } from "./UnitBanner"
import { LessonButton } from "./LessonButton"

interface UnitProps {
    id: number
    order: number
    description: string
    title: string
    lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
    activeLesson: typeof lessons.$inferSelect & { unit: typeof units.$inferSelect } | undefined;
    activeLessonPercentage: number
}

export function Unit({ activeLesson, activeLessonPercentage, description, id, lessons, order, title }: UnitProps) {
    return (
        <>
            <UnitBanner
                title={title}
                description={description}
            />

            <div className="relative flex flex-col items-center">
                {lessons.map((lesson, index) => {
                    const isCurrent = lesson.id === activeLesson?.id;
                    const isLocked = !lesson.completed && !isCurrent;

                    return (
                        <LessonButton
                            key={lesson.id}
                            id={lesson.id}
                            index={index}
                            totalCount={lessons.length - 1}
                            percentage={activeLessonPercentage}
                            current={isCurrent}
                            locked={isLocked}
                        />
                    )
                })}
            </div>
        </>
    )
}
