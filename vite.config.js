import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteSingleFile()],
    base: './',
    build: {
        minify: false // Optional: helpful for debugging if it fails again
    }
})
