import streamlit as st
import streamlit.components.v1 as components
import os
import json
import pandas as pd
import subprocess

st.set_page_config(layout="wide", page_title="Net Spec Vision")

# Custom CSS to hide Streamlit header/footer and remove padding
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        header {visibility: hidden;}
        footer {visibility: hidden;}
        .block-container {
            padding-top: 0rem !important;
            padding-bottom: 0rem !important;
            padding-left: 0rem !important;
            padding-right: 0rem !important;
            max-width: 100%;
        }
        iframe {
            display: block; /* Removed extra space below iframe */
        }
    </style>
""", unsafe_allow_html=True)

def load_react_app():
    # Path to the built React app (single html file)
    build_path = os.path.join(os.path.dirname(__file__), "dist", "index.html")
    
    if not os.path.exists(build_path):
        st.error("Build file not found. Please run 'npm run build' first.")
        return

    with open(build_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
        
    # Render the React app
    # Set height to a large value to accommodate the scrolling content of the React app
    components.html(html_content, height=1200, scrolling=True)

def update_data_from_excel(uploaded_file):
    try:
        # Read all sheets from Excel file (returns a dict of DataFrames)
        bfs = pd.read_excel(uploaded_file, sheet_name=None)
        
        new_data = []
        required_columns = ['id', 'vendor', 'model', 'standard', 'throughput']
        
        for sheet_name, df in bfs.items():
            # Skip empty sheets
            if df.empty:
                continue
                
            # Check required columns
            if not all(col in df.columns for col in required_columns):
                st.warning(f"Sheet '{sheet_name}' missing required columns: {', '.join(required_columns)}. Skipping this sheet.")
                continue

            # Convert simple DataFrame to nested JSON structure
            for _, row in df.iterrows():
                image_val = row.get('image', '')
                if image_val and not str(image_val).startswith('/') and not str(image_val).startswith('http'):
                     # Assume simple filename, prepend local static path
                     image_val = f"/app/static/images/{image_val}"
                
                item = {
                    "id": str(row['id']),
                    "vendor": str(row['vendor']),
                    "model": str(row['model']),
                    "image": image_val, 
                    "specs": {
                        "standard": row.get('standard', ''),
                        "radios": row.get('radios', ''),
                        "throughput": row.get('throughput', ''),
                        "ports": row.get('ports', ''),
                        "power": row.get('power', ''),
                        "ble": row.get('ble', '')
                    },
                    "badge": row.get('badge', '')
                }
                # Clean up NaN values
                item = json.loads(json.dumps(item).replace('NaN', '""')) 
                new_data.append(item)
        
        if not new_data:
            st.error("No valid data found in any sheet.")
            return False

        # Write to aps.json
        json_path = os.path.join(os.path.dirname(__file__), "src", "data", "aps.json")
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(new_data, f, indent=4)
            
        return True

    except Exception as e:
        st.error(f"Error processing file: {e}")
        return False

def run_build():
    try:
        with st.spinner('Rebuilding application...'):
            subprocess.run(["npm", "run", "build"], check=True, cwd=os.path.dirname(__file__))
        st.success("Build complete! Refreshing...")
        st.rerun()
    except subprocess.CalledProcessError as e:
        st.error(f"Build failed: {e}")

if __name__ == "__main__":
    
    # Sidebar for Data Update
    with st.sidebar:
        st.header("Data Management")
        uploaded_file = st.file_uploader("Upload Excel to Update APs", type=['xlsx'])
        
        if uploaded_file is not None:
            if st.button("Update Data"):
                if update_data_from_excel(uploaded_file):
                    st.success("Data updated successfully!")
                    run_build()

    load_react_app()
