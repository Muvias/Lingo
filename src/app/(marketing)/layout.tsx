import { Footer } from "./footer";
import { Header } from "./header";

export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 flex flex-col justify-center items-center">
                {children}
            </main>

            <Footer />
        </div>
    )
}