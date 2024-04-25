import { Progress } from "@/components/ui/progress"
import { useExitModal } from "@/store/use-exit-modal"
import { InfinityIcon, XIcon } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
    hearts: number
    percentage: number
    hasActiveSubscription: boolean
}

export function Header({ hearts, percentage, hasActiveSubscription }: HeaderProps) {
    const { open } = useExitModal()

    return (
        <header className="flex items-center justify-between max-w-[1140px] w-full mx-auto gap-x-7 pt-5 lg:pt-[50px] px-2.5">
            <XIcon
                onClick={open}
                className="text-slate-500 hover:opacity-75 transition cursor-pointer"
            />

            <Progress value={percentage} />

            <div className="flex items-center font-bold text-rose-500">
                <Image
                    src="/heart.svg"
                    alt="Coração"
                    height={28}
                    width={28}
                    className="mr-2"
                />

                {hasActiveSubscription
                    ? <InfinityIcon className="h-6 w-6 stroke-[3] shrink-0" />
                    : hearts
                }
            </div>
        </header>
    )
}
