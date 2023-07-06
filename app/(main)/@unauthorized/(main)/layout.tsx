import Hero from "@/components/landing/hero/Hero";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Hero />
            {children}
        </>
    )
}
