import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckCircleIcon, XCircle, XIcon } from "lucide-react"
import { useMedia, useKey } from "react-use"

interface FooterProps {
    disabled?: boolean
    status: "correct" | "wrong" | "none" | "completed"
    lessonId?: number;
    onCheck: () => void
}

export function Footer({ status, lessonId, disabled, onCheck }: FooterProps) {
    useKey("Enter", onCheck, {}, [onCheck])

    const isMobile = useMedia("(max-width: 1024px)")

    return (
        <footer
            className={cn("h-[100px] lg:h-[140px] border-t-2",
                status === "correct" && "border-transparent bg-green-100",
                status === "wrong" && "border-transparent bg-rose-100",
            )}
        >
            <div className="flex items-center justify-between max-w-[1140px] h-full px-6 lg:px-10 mx-auto">
                {status === "correct" && (
                    <div className="flex items-center font-bold text-base lg:text-2xl text-green-500">
                        <CheckCircleIcon className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        Muito bem!
                    </div>
                )}
                {status === "wrong" && (
                    <div className="flex items-center font-bold text-base lg:text-2xl text-rose-500">
                        <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        Tente novamente.
                    </div>
                )}
                {status === "completed" && (
                    <Button 
                        variant="default"
                        size={isMobile ? "sm" : "lg"}
                        onClick={() => window.location.href = `/lesson/${lessonId}`}
                    >
                        Praticar novamente
                    </Button>
                )}

                <Button
                    disabled={disabled}
                    className="ml-auto"
                    onClick={onCheck}
                    size={isMobile ? "sm" : "lg"}
                    variant={status === "wrong" ? "danger" : "secondary"}
                >
                    {status === "none" && "Confirmar"}
                    {status === "correct" && "Próximo"}
                    {status === "wrong" && "Tentar novamente"}
                    {status === "completed" && "Continuar"}
                </Button>
            </div>
        </footer>
    )
}
