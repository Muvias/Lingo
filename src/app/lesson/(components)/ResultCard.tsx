import { cn } from "@/lib/utils"
import Image from "next/image"

interface ResultCardProps {
    value: number
    variant: "points" | "hearts"
}

export function ResultCard({ value, variant }: ResultCardProps) {
    const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg"

    return (
        <div className={cn("w-full rounded-2xl border-2",
            variant === "points" && "bg-orange-400 border-orange-400",
            variant === "hearts" && "bg-rose-500 border-rose-500",
        )}>
            <div
                className={cn("p-1.5 rounded-t-xl text-xs font-bold text-center uppercase text-white",
                    variant === "points" && "bg-orange-400",
                    variant === "hearts" && "bg-rose-500"
                )}
            >
                {variant === "hearts" ? "Corações restantes" : "XP Total"}
            </div>

            <div
                className={cn("flex items-center justify-center p-6 rounded-2xl font-bold text-lg bg-white",
                    variant === "points" && "text-orange-400",
                    variant === "hearts" && "text-rose-500"
                )}
            >
                <Image
                    src={imageSrc}
                    alt="Icon"
                    width={25}
                    height={25}
                    className="mr-1.5"
                />
                {value}
            </div>
        </div>
    )
}
