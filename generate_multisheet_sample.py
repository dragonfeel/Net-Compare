import pandas as pd
import json
import os

# Path to JSON
json_path = 'src/data/aps.json'
output_path = 'src/data/sample_aps_multisheet.xlsx'

if not os.path.exists(json_path):
    print(f"Error: {json_path} not found.")
    exit(1)

with open(json_path, 'r') as f:
    data = json.load(f)

# Flatten data
flattened_data = []
for item in data:
    flat_item = item.copy()
    specs = flat_item.pop('specs', {})
    flat_item.update(specs)
    flattened_data.append(flat_item)

df = pd.DataFrame(flattened_data)

# Reorder columns to be user-friendly
cols = ['id', 'vendor', 'model', 'standard', 'throughput', 'ports', 'power', 'ble', 'radios', 'badge', 'image']
existing_cols = df.columns.tolist()
ordered_cols = [c for c in cols if c in existing_cols] + [c for c in existing_cols if c not in cols]
df = df[ordered_cols]

# Write to multi-sheet Excel
with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
    vendors = df['vendor'].unique()
    for vendor in vendors:
        vendor_df = df[df['vendor'] == vendor]
        # Excel sheet names limited to 31 chars
        sheet_name = str(vendor).replace('/', '-').replace('\\', '-').strip()[:31]
        if not sheet_name:
            sheet_name = "Unknown"
        vendor_df.to_excel(writer, sheet_name=sheet_name, index=False)

print(f"Successfully created {output_path}")
