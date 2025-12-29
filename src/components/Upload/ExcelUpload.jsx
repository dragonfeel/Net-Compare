import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExcelUpload({ onDataLoaded }) {
    const [isHovering, setIsHovering] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            // Transform generic JSON to Product Structure
            const products = data.map((row, index) => ({
                id: `custom-${index}-${Date.now()}`,
                vendor: row['Vendor'] || 'Unknown',
                model: row['Model'] || 'Custom Device',
                image: row['Image'] || 'https://placehold.co/400x400/222/FFF?text=No+Image',
                type: row['Type'] ? row['Type'].toLowerCase() : 'ap', // 'ap' or 'switch'
                specs: {
                    standard: row['Standard'] || 'N/A', // For APs
                    radios: row['Radios'] || 'N/A',       // For APs
                    throughput: row['Throughput'] || 'N/A', // For APs
                    ports: row['Ports'] || 'N/A',
                    power: row['Power'] || 'N/A',
                    capacity: row['Capacity'] || 'N/A',   // For Switches
                    layer: row['Layer'] || 'N/A',         // For Switches
                },
                badge: row['Badge'] || 'Custom'
            }));

            onDataLoaded(products);
        };

        reader.readAsBinaryString(file);
    };

    const handleDownloadTemplate = () => {
        const templateData = [
            {
                Vendor: 'Example Vendor',
                Model: 'Model-X',
                Type: 'ap',
                Standard: 'Wi-Fi 7',
                Radios: '4x4:4',
                Throughput: '10 Gbps',
                Ports: '2x5GbE',
                Power: 'PoE++',
                Image: 'https://placehold.co/400x400/222/FFF?text=Image',
                Badge: 'Flagship'
            },
            {
                Vendor: 'Example Vendor',
                Model: 'Switch-Y',
                Type: 'switch',
                Capacity: '1 Tbps',
                Ports: '48x10G',
                PoE: 'Class 6',
                Layer: 'L3',
                Image: '',
                Badge: 'Core'
            }
        ];

        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Template");
        XLSX.writeFile(wb, "network_specs_template.xlsx");
    };

    return (
        <div className="flex gap-4">
            <div className="relative">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border ${isHovering
                        ? 'bg-green-600 border-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                        : 'bg-white/5 border-white/10 text-gray-300'
                        }`}
                >
                    <FileSpreadsheet size={18} />
                    <span>Upload Excel Specs</span>
                </motion.button>
            </div>

            <motion.button
                onClick={handleDownloadTemplate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-3 rounded-full font-medium bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                title="Download Template Format"
            >
                <Upload size={18} className="rotate-180" />
                <span className="text-sm">Template</span>
            </motion.button>
        </div>
    );
}
