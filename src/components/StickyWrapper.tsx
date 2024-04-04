type Props = {
    children: React.ReactNode
}

export function StickyWrapper({ children }: Props) {
    return (
        <div className="hidden lg:block w-[368px] sticky self-end bottom-6">
            <div className="flex flex-col min-h-[calc(100vh-48px)] gap-y-4 sticky top-6">
                {children}
            </div>
        </div>
    )
}
