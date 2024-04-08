import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./List";

export default async function Page() {
    const coursesData = getCourses();
    const userProgressData = getUserProgress();

    const [courses, userProgress] = await Promise.all([
        coursesData,
        userProgressData
    ])

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Cursos de idiomas
            </h1>

            <List
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    )
}
