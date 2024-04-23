'use client'

import { refillHearts } from "@/actions/user-progress"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTransition } from "react"
import { toast } from "sonner"

interface ItemsProps {
    hearts: number
    points: number
    hasActiveSubscription: boolean
}

const POINTS_TO_REFILL = 50

export function Items({ hearts, points, hasActiveSubscription }: ItemsProps) {
    const [pending, startTransition] = useTransition()

    function onRefillHearts() {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

        startTransition(() => {
            refillHearts()
                .catch(() => toast.error("Alguma coisa deu errado. Por favor tente novamente."))
        });
    }

    return (
        <ul className="w-full">
            <div className=" flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image
                    src="/heart.svg"
                    alt="Coração"
                    height={40}
                    width={40}
                />

                <div className="flex-1">
                    <p className="text-base lg:text-xl font-bold text-neutral-700">
                        Recarregar corações
                    </p>
                </div>

                <Button
                    onClick={onRefillHearts}
                    disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
                >
                    {hearts === 5
                        ? "Full"
                        : (
                            <div className="flex items-center">
                                <Image
                                    src="/points.svg"
                                    alt="Pontos"
                                    height={20}
                                    width={20}
                                />
                                <p>
                                    {POINTS_TO_REFILL}
                                </p>
                            </div>
                        )
                    }
                </Button>
            </div>
        </ul>
    )
}
