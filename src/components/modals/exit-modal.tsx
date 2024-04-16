'use client'

import Image from "next/image"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useExitModal } from "@/store/use-exit-modal"
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

export function ExitModal() {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = useExitModal()

    useEffect(() => setIsClient(true), [])

    if (!isClient) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={close}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-center justify-center w-full mb-5">
                        <Image
                            src="/mascot_sad.svg"
                            alt="Mascote"
                            height={80}
                            width={80}
                        />
                    </div>

                    <AlertDialogTitle className="text-center font-bold text-2xl">
                        Espere, não vá!
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center text-base">
                        Você está prestes a sair da lição. Você tem certeza?
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mb-4">
                    <div className="space-y-4">
                        <AlertDialogCancel className="w-full">
                            Continuar aprendendo
                        </AlertDialogCancel>
                        <AlertDialogAction className="w-full" onClick={() => router.push("/learn")}>
                            Finalizar sessão
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
