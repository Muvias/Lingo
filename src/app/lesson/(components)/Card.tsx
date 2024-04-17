import Image from "next/image"
import { useCallback } from "react"
import { useAudio, useKey } from "react-use"

import { challenges } from "@/db/schema"
import { cn } from "@/lib/utils"

interface CardProps {
    key: number
    id: number
    text: string
    shortcut: string
    selected?: boolean
    disabled?: boolean
    status?: "correct" | "wrong" | "none"
    imageSrc: string | null
    audioSrc: string | null
    onClick: () => void
    type: typeof challenges.$inferSelect["type"]
}

export function Card({ key, id, imageSrc, audioSrc, onClick, shortcut, text, type, disabled, selected, status }: CardProps) {
    const [audio, _, controls] = useAudio({ src: audioSrc || "" })

    const handleClick = useCallback(() => {
        if (disabled) return;

        controls.play()

        onClick()
    }, [disabled, onClick, controls])

    useKey(shortcut, handleClick, {}, [handleClick]);

    return (
        <div
            onClick={handleClick}
            className={cn("h-full p-4 lg:p-6 rounded-xl border-2 border-b-4 active:border-b-2 hover:bg-black/5 cursor-pointer",
                selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
                selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100",
                selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
                disabled && "pointer-events-none hover:bg-white",
                type === "ASSIST" && "lg:p-3 w-full"
            )}
        >
            {audio}
            {imageSrc && (
                <div className="relative aspect-square max-h-[80px] lg:max-h-[150px] w-full mb-4">
                    <Image
                        src={imageSrc}
                        alt={text}
                        fill
                    />
                </div>
            )}

            <div
                className={cn("flex items-center justify-between", type === "ASSIST" && "flex-row-reverse")}
            >
                {type === "ASSIST" && <div />}

                <p
                    className={cn("text-sm lg:text-base text-neutral-600",
                        selected && "text-sky-500",
                        selected && status === "correct" && "text-green-500",
                        selected && status === "wrong" && "text-rose-500"
                    )}
                >
                    {text}
                </p>

                <div
                    className={cn("flex items-center justify-center w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] border-2 rounded-lg text-neutral-400 text-xs lg:text-[15px] font-semibold",
                        selected && "border-sky-300 text-sky-500",
                        selected && status === "correct" && "border-green-500 text-green-500",
                        selected && status === "wrong" && "border-rose-500 text-rose-500"
                    )}
                >
                    {shortcut}
                </div>
            </div>
        </div>
    )
}
