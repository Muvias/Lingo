import Link from "next/link";
import Image from "next/image";

import { quests } from "@/constants";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface QuestsProps {
    points: number;
}

export function Quests({ points }: QuestsProps) {
    return (
        <div className="p-4 border-2 rounded-xl space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg">
                    Missões
                </h3>

                <Link href="/quests">
                    <Button
                        size="sm"
                        variant="primaryOutline"
                    >
                        Ver todas
                    </Button>
                </Link>
            </div>

            <ul className="w-full space-y-4">

                {quests.map((quest) => {
                    const progress = (points / quest.value) * 100;

                    return (
                        <div
                            key={quest.title}
                            className="flex items-center w-full pb-4 gap-x-3"
                        >
                            <Image
                                src="/points.svg"
                                alt="pontos"
                                height={40}
                                width={40}
                            />

                            <div className="flex flex-col w-full gap-y-2">
                                <h2 className="font-bold text-neutral-700">
                                    {quest.title}
                                </h2>

                                <Progress
                                    value={progress}
                                    className="h-2"
                                />
                            </div>
                        </div>
                    )
                })}

            </ul>
        </div >
    )
}
