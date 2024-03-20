import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";

export function Header() {
    return (
        <header className="w-full h-20 px-4 border-b-2 border-slate-200">
            <div className="flex items-center justify-between lg:max-w-screen-lg h-full mx-auto">
                <div className="flex items-center gap-x-3 pt-8 pl-4 pb-7">
                    <Image
                        src='/mascot.svg'
                        alt="logo"
                        height={40}
                        width={40}
                    />
                    <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
                        Lingo
                    </h1>
                </div>

                <ClerkLoading>
                    <LoaderIcon className="w-5 h-5 text-muted-foreground animate-spin" />
                </ClerkLoading>

                <ClerkLoaded>
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                        />
                    </SignedIn>

                    <SignedOut>
                        <SignInButton
                            mode="modal"
                            afterSignInUrl="/learn"
                            afterSignUpUrl="/learn"
                        >
                            <Button size='lg' variant="ghost">
                                Entrar
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    )
}
