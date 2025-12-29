import { motion } from 'framer-motion';
import { X, Check, Share2 } from 'lucide-react';

export default function ProductDetailsModal({ product, onClose }) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-[#1a1a1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Image & Key Info */}
                <div className="w-full md:w-2/5 p-8 bg-gradient-to-br from-white/5 to-transparent relative flex flex-col items-center justify-center border-r border-white/5">
                    {/* Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />

                    <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        src={product.image}
                        alt={product.model}
                        className="relative w-full h-64 object-contain drop-shadow-2xl z-10"
                    />

                    <div className="mt-8 text-center relative z-10">
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 inline-block">
                            {product.vendor}
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-2">{product.model}</h2>
                        <p className="text-gray-400 text-sm">{product.badge || 'Enterprise Grade'}</p>
                    </div>
                </div>

                {/* Right Side: Detailed Specs */}
                <div className="w-full md:w-3/5 p-8 overflow-y-auto max-h-[80vh]">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        Technical Specifications
                    </h3>

                    <div className="grid gap-4">
                        {Object.entries(product.specs).map(([key, value], index) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                    <div className="w-2 h-2 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
                                    <span className="text-gray-400 capitalize font-medium">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                </div>
                                <span className="text-white font-semibold text-right">
                                    {value}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                        <button className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                            <Share2 size={18} /> Share Specs
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
