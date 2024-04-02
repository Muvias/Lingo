import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Sidebar } from "./sidebar";

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger>
                <MenuIcon className="text-white" />
            </SheetTrigger>

            <SheetContent
                side="left"
                className="p-0 z-[100]"
            >
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
