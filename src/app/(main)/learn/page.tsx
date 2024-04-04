import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { Header } from "./Header";
import { UserProgress } from "@/components/UserProgress";

export default function page() {
    return (
        <div className="flex flex-row-reverse gap-12 px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={{ title: "Espanhol", imageSrc: "/es.svg" }}
                    hearts={5}
                    points={100}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            
            <FeedWrapper>
                <Header title="Espanhol" />
            </FeedWrapper>
        </div>
    )
}
