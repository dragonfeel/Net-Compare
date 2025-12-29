export default function SplineScene() {
    return (
        <div className="w-full h-full absolute inset-0 z-0 bg-[#050505]">
            {/* Simple Black Background as requested */}
            {/* Overlay Gradients to add subtle depth if needed, or keep flat black */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none" />
        </div>
    );
}
