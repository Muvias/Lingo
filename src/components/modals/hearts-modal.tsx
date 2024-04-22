'use client'

import Image from "next/image"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useHeartsModal } from "@/store/use-hearts-modal"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "../ui/alert-dialog"

export function HeartsModal() {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = useHeartsModal()

    useEffect(() => setIsClient(true), [])

    if (!isClient) return null;

    function onClick() {
        close()

        router.push("/store")
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={close}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-center justify-center w-full mb-5">
                        <Image
                            src="/mascot_bad.svg"
                            alt="Mascote"
                            height={80}
                            width={80}
                        />
                    </div>

                    <AlertDialogTitle className="text-center font-bold text-2xl">
                        Você ficou sem corações!
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center text-base">
                        Se torne Premium para ter corações ilimitados, ou compre mais na loja.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mb-4">
                    <div className="space-y-4">
                        <AlertDialogCancel className="w-full" onClick={onClick}>
                            Obter corações ilimitados
                        </AlertDialogCancel>
                        <AlertDialogAction className="w-full text-sky-500 font-bold">
                            Não, obrigado
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
