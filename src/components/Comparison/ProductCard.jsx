import { motion } from 'framer-motion';
import { Wifi, Activity, Zap, Server, Check } from 'lucide-react';

export default function ProductCard({ product, isSelected, onToggle, onViewDetails }) {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className={`group relative border rounded-2xl p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 ${isSelected
                ? 'bg-blue-500/10 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                : 'bg-white/5 border-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]'
                }`}
            onClick={() => onToggle(product.id)}
        >
            {/* Dynamic Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Selection Checkbox */}
            <div className="absolute top-4 right-4 z-20">
                <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${isSelected
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-white/10 border-white/30 group-hover:border-white/50'
                    }`}>
                    {isSelected && <Check size={14} className="text-white" />}
                </div>
            </div>

            {/* Badge (Category) */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                {/* For Switches, show specific badge as category. For APs, show Wi-Fi generation. */}
                {product.type === 'switch' && (
                    <span className="px-3 py-1 text-xs font-semibold bg-white/10 border border-white/20 rounded-full text-white/90 w-fit">
                        {product.badge}
                    </span>
                )}

                {/* Dynamic Wi-Fi Standard Badge for APs (Use this AS the category badge) */}
                {product.type !== 'switch' && (
                    <>
                        {product.specs.standard?.includes('Wi-Fi 7') && (
                            <span className="px-3 py-1 text-xs font-bold bg-purple-500/20 border border-purple-500/50 text-purple-200 rounded-full w-fit shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                                Wi-Fi 7
                            </span>
                        )}
                        {product.specs.standard?.includes('Wi-Fi 6E') && (
                            <span className="px-3 py-1 text-xs font-bold bg-teal-500/20 border border-teal-500/50 text-teal-200 rounded-full w-fit shadow-[0_0_15px_rgba(20,184,166,0.4)]">
                                Wi-Fi 6E
                            </span>
                        )}
                        {product.specs.standard?.includes('Wi-Fi 6') && !product.specs.standard?.includes('6E') && (
                            <span className="px-3 py-1 text-xs font-bold bg-blue-500/20 border border-blue-500/50 text-blue-200 rounded-full w-fit">
                                Wi-Fi 6
                            </span>
                        )}
                    </>
                )}
            </div>

            {/* Image Area */}
            <div className="relative h-48 w-full flex items-center justify-center mb-6">
                {/* Glow behind image based on Tech */}
                <div className={`absolute w-32 h-32 blur-[50px] rounded-full transition-colors ${product.specs.standard?.includes('Wi-Fi 7') ? 'bg-purple-500/20' :
                    product.specs.standard?.includes('Wi-Fi 6E') ? 'bg-teal-500/20' :
                        'bg-white/10 group-hover:bg-blue-400/20'
                    }`} />
                <img
                    src={product.image}
                    alt={product.model}
                    className="relative h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="text-sm text-gray-400 mb-1">{product.vendor}</div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    {product.model}
                </h3>

                {/* Specs Grid */}
                <div className="space-y-3">
                    {/* Render different specs based on product type or generic key mapping */}
                    {product.type === 'switch' ? (
                        <>
                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Activity size={16} /> <span>Capacity</span>
                                </div>
                                <div className="font-medium text-white">{product.specs.capacity}</div>
                            </div>
                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Server size={16} /> <span>Ports</span>
                                </div>
                                <div className="font-medium text-white">{product.specs.ports}</div>
                            </div>
                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Zap size={16} /> <span>PoE</span>
                                </div>
                                <div className="font-medium text-white">{product.specs.poe}</div>
                            </div>
                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Activity size={16} /> <span>Layer</span>
                                </div>
                                <div className="font-medium text-white">{product.specs.layer}</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Wifi size={16} /> <span>Standard</span>
                                </div>
                                <div className="font-medium text-white">{product.specs.standard}</div>
                            </div>
                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Activity size={16} /> <span>Throughput</span>
                                </div>
                                <div className="font-medium text-white">{product.specs.throughput}</div>
                            </div>
                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Zap size={16} /> <span>Radios</span>
                                </div>
                                <div className="font-medium text-white truncate max-w-[150px]" title={product.specs.radios}>{product.specs.radios}</div>
                            </div>
                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Server size={16} /> <span>Ports</span>
                                </div>
                                <div className="font-medium text-white">{product.specs.ports}</div>
                            </div>
                        </>
                    )}
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(product);
                    }}
                    className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium transition-all group-hover:shadow-lg"
                >
                    View Details
                </button>
            </div>
        </motion.div>
    );
}
