import { useState, useRef } from 'react'
import SplineScene from './components/Hero/SplineScene'
import HeroOverlay from './components/Hero/HeroOverlay'
import ComparisonGrid from './components/Comparison/ComparisonGrid'
import { apData } from './data/aps'
import { switchData } from './data/switches'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
    const comparisonRef = useRef(null);
    const [category, setCategory] = useState('APs'); // 'APs' or 'Switches'

    const scrollToComparison = () => {
        comparisonRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const currentData = category === 'APs' ? apData : switchData;

    return (
        <main className="relative w-full min-h-screen bg-[#050505] text-white">
            {/* Hero Section */}
            <section className="relative w-full h-screen overflow-hidden">
                <SplineScene />
                <HeroOverlay onCompareClick={scrollToComparison} />
            </section>

            {/* Comparison Section */}
            <section ref={comparisonRef} className="relative w-full min-h-screen py-32 px-4 bg-[#050505]">
                {/* Background Glow for Section */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="text-center mb-12 flex flex-col items-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
                            Premium Hardware
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                            Compare technical specifications for high-performance enterprise infrastructure.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                            {/* Premium Category Toggle */}
                            <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md relative">
                                {/* Animated Background Pill */}
                                <div className="absolute inset-1 bg-white/10 rounded-full transition-all duration-300 pointer-events-none"
                                    style={{
                                        left: category === 'APs' ? '4px' : '50%',
                                        width: 'calc(50% - 4px)'
                                    }}
                                />

                                <button
                                    onClick={() => setCategory('APs')}
                                    className={`relative z-10 px-8 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${category === 'APs' ? 'text-white' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Access Points
                                </button>
                                <button
                                    onClick={() => setCategory('Switches')}
                                    className={`relative z-10 px-8 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${category === 'Switches' ? 'text-white' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Switches
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Key prop ensures grid resets when category changes */}
                    <ComparisonGrid key={category} data={currentData} />
                </div>
            </section>
        </main>
    )
}

export default App
