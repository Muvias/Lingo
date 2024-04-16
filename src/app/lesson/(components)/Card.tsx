import { challenges } from "@/db/schema"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface CardProps {
    key: number
    id: number
    text: string
    shortchut: string
    selected?: boolean
    disabled?: boolean
    status?: "correct" | "wrong" | "none"
    imageSrc: string | null
    audioSrc: string | null
    onClick: () => void
    type: typeof challenges.$inferSelect["type"]
}

export function Card({ key, id, imageSrc, audioSrc, onClick, shortchut, text, type, disabled, selected, status }: CardProps) {
    return (
        <div
            onClick={() => { }}
            className={cn("h-full p-4 lg:p-6 rounded-xl border-2 border-b-4 active:border-b-2 hover:bg-black/5 cursor-pointer",
                selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
                selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100",
                selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
                disabled && "pointer-events-none hover:bg-white",
                type === "ASSIST" && "lg:p-3 w-full"
            )}
        >
            {imageSrc && (
                <div className="relative aspect-square max-h-[80px] lg:max-h-[150px] w-full mb-4">
                    <Image
                        src={imageSrc}
                        alt={text}
                        fill
                    />
                </div>
            )}
        </div>
    )
}
