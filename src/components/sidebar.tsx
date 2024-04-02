import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { LoaderIcon } from "lucide-react";

type Props = {
    className?: string;
}

export function Sidebar({ className }: Props) {
    return (
        <div className={cn("lg:fixed flex flex-col lg:w-[256px] h-full top-0 left-0 px-4 border-r-2", className)}>
            <Link href="/learn">
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
            </Link>

            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem
                    label="Aprender"
                    href="/learn"
                    iconSrc="/learn.svg"
                />

                <SidebarItem
                    label="Ligas"
                    href="/leaderboard"
                    iconSrc="/leaderboard.svg"
                />

                <SidebarItem
                    label="Missões"
                    href="/quests"
                    iconSrc="/quests.svg"
                />

                <SidebarItem
                    label="Loja"
                    href="/shop"
                    iconSrc="/shop.svg"
                />
            </div>

            <div className="p-4">
                <ClerkLoading>
                    <LoaderIcon className="w-5 h-5 text-muted-foreground animate-spin" />
                </ClerkLoading>

                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
            </div>
        </div>
    )
}
