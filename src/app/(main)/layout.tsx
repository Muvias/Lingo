import { MobileHeader } from "@/components/MobileHeader";
import { Sidebar } from "@/components/sidebar";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <MobileHeader />
            <Sidebar className="hidden lg:flex" />
            
            <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
                {children}
            </main>
        </>
    )
}