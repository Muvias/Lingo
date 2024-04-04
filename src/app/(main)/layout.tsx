import { MobileHeader } from "@/components/MobileHeader";
import { Sidebar } from "@/components/sidebar";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <MobileHeader />
            <Sidebar className="hidden lg:flex" />

            <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
                <div className="max-w-[1056px] h-full mx-auto pt-6">
                    {children}
                </div>
            </main>
        </>
    )
}