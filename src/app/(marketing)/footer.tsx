import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="hidden lg:block h-20 w-full p-2 border-t-2 border-slate-200">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost" className="w-full">
                    <Image
                        src="/flags/hr.svg"
                        alt="Croácia"
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Croata
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image
                        src="/flags/es.svg"
                        alt="Espanha"
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Espanhol
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image
                        src="/flags/fr.svg"
                        alt="França"
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Francês
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image
                        src="/flags/jp.svg"
                        alt="Japão"
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Japonês
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image
                        src="/flags/it.svg"
                        alt="Itália"
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Italiano
                </Button>
            </div>
        </footer>
    )
}
