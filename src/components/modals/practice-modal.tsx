'use client'

import Image from "next/image"

import { useEffect, useState } from "react"

import { usePracticeModal } from "@/store/use-practice-modal"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "../ui/alert-dialog"

export function PracticeModal() {
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = usePracticeModal()

    useEffect(() => setIsClient(true), [])

    if (!isClient) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={close}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-center justify-center w-full mb-5">
                        <Image
                            src="/heart.svg"
                            alt="Coração"
                            height={100}
                            width={100}
                        />
                    </div>

                    <AlertDialogTitle className="text-center font-bold text-2xl">
                        Praticar lição
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center text-base">
                        Pratique lições para ganhar corações e pontos. Você não perderá corações ou pontos aqui.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mb-4">
                    <AlertDialogCancel className="w-full">
                        Eu entendo
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
