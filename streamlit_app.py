import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(layout="wide", page_title="Net Spec Vision")

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
    st.title("Premium Network Specification Comparison")
    st.write("Powered by React & Vite (Embedded)")
    
    # Add a refresh button just in case
    if st.button("Reload App"):
        st.rerun()
        
    load_react_app()
