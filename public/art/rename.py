import os

def rename_images_here():
    # Detect the directory where THIS script is saved
    folder_path = os.path.dirname(os.path.abspath(__file__))
    
    valid_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp')
    
    # List files, excluding the script itself to avoid renaming it!
    script_name = os.path.basename(__file__)
    files = [f for f in os.listdir(folder_path) 
             if f.lower().endswith(valid_extensions) and f != script_name]
    
    files.sort()

    if not files:
        print("No images found in this folder.")
        return

    for index, filename in enumerate(files, start=1):
        ext = os.path.splitext(filename)[1]
        new_name = f"{index}{ext}"
        
        source = os.path.join(folder_path, filename)
        destination = os.path.join(folder_path, new_name)
        
        try:
            os.rename(source, destination)
            print(f"Renamed: {filename} -> {new_name}")
        except OSError as e:
            print(f"Error renaming {filename}: {e}")

if __name__ == "__main__":
    rename_images_here()