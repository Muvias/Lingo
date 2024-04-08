import { LoaderIcon } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <LoaderIcon className="h-6 w-6 text-muted-foreground animate-spin" />
        </div>
    )
}
