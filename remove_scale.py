#!/usr/bin/env python3
import os
import re

# Only these planets should keep the scale
planets_to_keep = {'mars', 'jupiter', 'saturn', 'venus', 'mercury', 'neptune', 'uranus'}

# All other directories to revert
dirs_to_remove_scale = [
    # Rovers/Explorers
    'perseverance', 'opportunity', 'spirit', 'sojourner',
    # Voyagers/Sputnik
    'rasat', 'voyager1', 'voyager2', 'sputnik',
    # Space stations/Telescopes/Probes
    'iss', 'hubble', 'jameswebb', 'kepler', 'ingenuity', 'exomars', 
    'marsodyssey', 'marsreconnaissance', 'lagari', 'imece',
    # Satellites
    'gokturk-1', 'gokturk-2', 'turksat-1A', 'turksat-1B', 'turksat-1C',
    'turksat-2A', 'turksat-3A', 'turksat-3B', 'turksat-4A', 'turksat-5A',
    'turksat-5B', 'turksat-6A',
    # Other
    'byd', 'toyota'
]

base_path = '/workspaces/Website_3.0'

for item in dirs_to_remove_scale:
    file_path = os.path.join(base_path, item, 'index.html')
    
    if not os.path.exists(file_path):
        print(f"Skip: {item} - file not found")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove scale attribute from model-viewer
    # Match: scale="0.05 0.05 0.05" with optional whitespace around it
    pattern = r'\s+scale="0\.05 0\.05 0\.05"'
    new_content = re.sub(pattern, '', content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed scale from: {item}")
    else:
        print(f"No scale to remove: {item}")

print("Done!")
