import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import Image from "next/image"

interface CardProps {
    id: number
    title: string
    imageSrc: string
    onClick: (id: number) => void
    disabled?: boolean
    active?: boolean
}

export function Card({ id, imageSrc, onClick, title, active, disabled }: CardProps) {
    return (
        <div
            onClick={() => onClick(id)}
            className={cn(
                "flex flex-col items-center justify-between min-h-[217px] h-full min-w-[200px] p-3 pb-6 border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2",
                disabled && "pointer-events-none opacity-50"
            )}
        >
            <div className="flex items-center justify-end min-h-[24px] w-full">
                {active && (
                    <div className="flex items-center justify-center p-1.5 rounded-md bg-green-600">
                        <CheckIcon className="text-white stroke-[4] h-4 w-4" />
                    </div>
                )}
            </div>

            <Image 
                src={`/flags/${imageSrc}`}
                alt={title}
                height={70}
                width={93.33}
                className="rounded-lg drop-shadow-md border object-cover"
            />
            <p className="text-neutral-700 text-center font-bold mt-3">
                {title}
            </p>
        </div>
    )
}
