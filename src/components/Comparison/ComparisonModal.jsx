import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

export default function ComparisonModal({ products, onClose }) {
    if (!products || products.length === 0) return null;

    // Extract all spec keys from the first product to generate rows
    const specKeys = Object.keys(products[0].specs);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-6xl max-h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <CheckCircle2 className="text-blue-400" /> Compare Specs
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Comparing {products.length} devices</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Table Area */}
                <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 min-w-[200px] sticky left-0 z-10 bg-[#0A0A0A] border-b border-white/10 font-semibold text-gray-400">
                                    Feature
                                </th>
                                {products.map(product => (
                                    <th key={product.id} className="p-4 min-w-[250px] border-b border-white/10">
                                        <div className="space-y-2">
                                            <div className="h-16 flex items-center justify-center mb-2">
                                                <img src={product.image} alt={product.model} className="h-full object-contain" />
                                            </div>
                                            <div className="text-lg font-bold text-white">{product.model}</div>
                                            <div className="text-xs text-blue-400 font-mono uppercase">{product.vendor}</div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {specKeys.map(key => (
                                <tr key={key} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 sticky left-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-sm font-medium text-gray-300 capitalize border-r border-white/5">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </td>
                                    {products.map(product => (
                                        <td key={`${product.id}-${key}`} className="p-4 text-gray-300">
                                            {product.specs[key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {/* Badge Row */}
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-4 sticky left-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-sm font-medium text-gray-300 border-r border-white/5">Category</td>
                                {products.map(product => (
                                    <td key={`${product.id}-badge`} className="p-4">
                                        <span className="px-3 py-1 text-xs font-semibold bg-white/10 border border-white/20 rounded-full text-white/90">
                                            {product.badge}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Close Comparison
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
