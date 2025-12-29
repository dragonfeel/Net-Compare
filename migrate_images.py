import json
import os
import requests
import shutil
import urllib3

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Setup paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(BASE_DIR, 'src', 'data', 'aps.json')
# Use static/images for output
IMAGES_DIR = os.path.join(BASE_DIR, 'static', 'images')

# Ensure images dir exists
os.makedirs(IMAGES_DIR, exist_ok=True)

def download_image(url, save_path):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        if os.path.exists(save_path):
            return True # Skip if exists
            
        response = requests.get(url, headers=headers, stream=True, timeout=10, verify=False)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                response.raw.decode_content = True
                shutil.copyfileobj(response.raw, f)
            return True
        else:
            print(f"Failed to download {url}: Status {response.status_code}")
            return False
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def create_placeholder(save_path, product_id):
    if os.path.exists(save_path):
        return True
    fallback_url = f"https://placehold.co/400x400/333/FFF.png?text={product_id}"
    return download_image(fallback_url, save_path)

if not os.path.exists(JSON_PATH):
    print(f"Error: {JSON_PATH} not found")
    exit(1)

with open(JSON_PATH, 'r') as f:
    data = json.load(f)

updated_count = 0
for item in data:
    image_url = item.get('image', '')
    product_id = item.get('id', 'unknown')
    
    # Check if already pointing to static
    if image_url.startswith('/app/static/images'):
        continue
        
    ext = 'png'
    # Simplified ext detection
    if '.jpg' in image_url.lower(): ext = 'jpg'
    elif '.jpeg' in image_url.lower(): ext = 'jpeg'
    
    filename = f"{product_id}.{ext}"
    local_path = os.path.join(IMAGES_DIR, filename)
    # Streamlit serves static folder at /app/static/
    public_url = f"app/static/images/{filename}" 
    # Use relative path if possible, but inside iframe, "app/static" is suspicious. 
    # The iframe is usually at root or a blob. 
    # But let's try assuming the app is served at root.
    
    print(f"Processing {product_id}...")
    
    # if image_url is a URL, download it again OR copy from public if I hadn't moved it.
    # But I moved public/images/* to static/images/*.
    # So files should exist.
    
    if os.path.exists(local_path):
        item['image'] = public_url
        updated_count += 1
        continue

    # If file implies placeholder or missing, try download placeholder
    if not os.path.exists(local_path):
        # Force png for placeholder
        filename = f"{product_id}.png"
        local_path = os.path.join(IMAGES_DIR, filename)
        public_url = f"app/static/images/{filename}"
        create_placeholder(local_path, product_id)
        item['image'] = public_url
        updated_count += 1

with open(JSON_PATH, 'w') as f:
    json.dump(data, f, indent=4)

print(f"Migration complete. Updated {updated_count} images.")
