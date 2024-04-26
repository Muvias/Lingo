import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

export default function AdminPage() {
    return (
        <App />
    )
}
