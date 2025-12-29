import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroOverlay({ onCompareClick }) {
    return (
        <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            {/* Content Container - Pointer events auto to allow interaction with buttons */}
            <div className="pointer-events-auto max-w-4xl space-y-8">

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        The Premier Hub For
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-white">
                        HPEN Engineers
                    </span>
                </motion.h1>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <button
                        onClick={onCompareClick}
                        className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                        <span className="flex items-center gap-2">
                            Start Comparison <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-sm font-medium hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
                        View Documentation
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
