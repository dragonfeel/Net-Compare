import { useState } from 'react';
import ProductCard from './ProductCard';
import ComparisonModal from './ComparisonModal';
import ProductDetailsModal from './ProductDetailsModal';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';

export default function ComparisonGrid({ data }) {
    const [activeTab, setActiveTab] = useState('All');
    const [selectedIds, setSelectedIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [viewedProduct, setViewedProduct] = useState(null);

    // Extract unique vendors for tabs
    const vendors = ['All', ...new Set(data.map(item => item.vendor))];

    const filteredData = activeTab === 'All'
        ? data
        : data.filter(item => item.vendor === activeTab);

    // Sort Logic: Wi-Fi 7 > Wi-Fi 6E > Wi-Fi 6 > Others
    const sortedData = [...filteredData].sort((a, b) => {
        const getScore = (product) => {
            const std = product.specs.standard || '';
            if (std.includes('Wi-Fi 7')) return 3;
            if (std.includes('Wi-Fi 6E')) return 2;
            if (std.includes('Wi-Fi 6')) return 1;
            return 0; // Switches or others
        };
        return getScore(b) - getScore(a); // Descending order
    });

    const handleToggleSelection = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const selectedProducts = data.filter(p => selectedIds.includes(p.id));

    return (
        <div className="w-full max-w-7xl mx-auto relative">
            {/* Vendor Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {vendors.map((vendor) => (
                    <button
                        key={vendor}
                        onClick={() => setActiveTab(vendor)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border ${activeTab === vendor
                            ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {vendor}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode='popLayout'>
                    {sortedData.map((product) => (
                        <motion.div
                            layout
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard
                                product={product}
                                isSelected={selectedIds.includes(product.id)}
                                onToggle={handleToggleSelection}
                                onViewDetails={setViewedProduct}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {sortedData.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No products found for this category.
                </div>
            )}

            {/* Floating Comparison Bar */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#111] border border-white/20 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4"
                    >
                        <span className="text-sm font-medium text-white">{selectedIds.length} items selected</span>
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-bold transition-colors flex items-center gap-2"
                        >
                            Compare <ArrowRightLeft size={16} />
                        </button>
                        <button
                            onClick={() => setSelectedIds([])}
                            className="text-gray-400 hover:text-white text-xs underline"
                        >
                            Clear
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Comparison Modal */}
            <AnimatePresence>
                {showModal && (
                    <ComparisonModal
                        products={selectedProducts}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </AnimatePresence>

            {/* Product Details Modal */}
            <AnimatePresence>
                {viewedProduct && (
                    <ProductDetailsModal
                        product={viewedProduct}
                        onClose={() => setViewedProduct(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
