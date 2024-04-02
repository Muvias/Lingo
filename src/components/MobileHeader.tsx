import { MobileSidebar } from "./MobileSidebar";

export function MobileHeader() {
    return (
        <div className="lg:hidden fixed flex items-center px-6 h-[50px] w-full top-0 z-50 bg-green-500">
            <MobileSidebar />
        </div>
    )
}
