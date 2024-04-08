'use client'

import { useTransition } from "react"

import { courses, userProgress } from "@/db/schema"
import { useRouter } from "next/navigation"
import { Card } from "./Card"
import { upsertUserProgress } from "@/actions/user-progress"
import { toast } from "sonner"

interface ListProps {
    courses: typeof courses.$inferSelect[]
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

export function List({ courses, activeCourseId }: ListProps) {
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    function onClick(id: number) {
        if (pending) return;

        if (id === activeCourseId) return router.push("/learn");

        startTransition(() => {
            upsertUserProgress(id)
                .catch(() => toast.error("Alguma coisa deu errado."))
        })
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] pt-6 gap-4">
            {courses.map((course) => (
                <Card
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onClick={onClick}
                    disabled={pending}
                    active={course.id === activeCourseId}
                />
            ))}
        </div>
    )
}
