import streamlit as st
import streamlit.components.v1 as components
import os

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

if __name__ == "__main__":
    load_react_app()
