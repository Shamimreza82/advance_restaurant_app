interface HeroProps {
    title: string
    subtitle?: string
    backgroundImage?: string
    backgroundPosition?: string
    clasName?: string
}

export function ImageTop({ title, subtitle, backgroundImage, backgroundPosition = "center", clasName }: HeroProps) {
    return (
        <section
            className={`relative h-96 w-full flex items-center justify-center overflow-hidden ${clasName}`}
            style={{
                backgroundImage: `url(${backgroundImage || "/images/default-bg.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition,
            }}
        >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">{title}</h1>
                {subtitle && <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto text-balance">{subtitle}</p>}
            </div>
        </section>
    )
}