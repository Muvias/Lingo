import Image from "next/image"
import Link from "next/link"

import { Button } from "./ui/button"

export function Promo() {
    return (
        <div className="p-4 border-2 rounded-xl space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                    <Image
                        src="/unlimited.svg"
                        alt="Pro"
                        height={26}
                        width={26}
                    />

                    <h3 className="font-bold text-lg">
                        Assine o plano Pro
                    </h3>
                </div>

                <p className="text-muted-foreground">
                    Tenha corações ilimitados e mais!
                </p>
            </div>

            <Button
                size="lg"
                variant="super"
                className="w-full"
                asChild
            >
                <Link
                    href="/shop"
                >
                    Assinar agora
                </Link>
            </Button>
        </div >
    )
}
