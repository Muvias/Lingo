import { Button } from "@/components/ui/button"
import { NotebookTextIcon } from "lucide-react"
import Link from "next/link"

interface UnitBannerProps {
    title: string
    description: string
}

export function UnitBanner({ title, description }: UnitBannerProps) {
    return (
        <div className="flex items-center justify-between w-full p-5 rounded-xl text-white bg-green-500">
            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">
                    {title}
                </h3>

                <p className="text-lg">
                    {description}
                </p>
            </div>

            <Link href="/lesson">
                <Button
                    size="lg"
                    variant="secondary"
                    className="hidden xl:flex border-2 border-b-4 active:border-b-2"
                >
                    <NotebookTextIcon className="mr-2" />
                    Continuar
                </Button>
            </Link>
        </div>
    )
}
