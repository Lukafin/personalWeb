import os
import yaml
from pathlib import Path
from podcastfy.client import generate_podcast as podcastfy_generate
from dotenv import load_dotenv
import shutil

# Load environment variables
load_dotenv()

def get_blog_posts():
    posts_dir = Path('_posts')
    for post_file in posts_dir.glob('*.md'):
        with open(post_file, 'r') as f:
            content = f.read()
            # Split the content into front matter and post content
            _, fm, post_content = content.split('---', 2)
            front_matter = yaml.safe_load(fm)
            yield post_file, front_matter, post_content.strip()

def generate_podcast_from_post(post_file, title, content):
    output_dir = Path('assets/podcasts')
    output_dir.mkdir(parents=True, exist_ok=True)
    
    output_file = output_dir / f"{post_file.stem}.mp3"
    
    print(f"Generating podcast for: {title}")
    print(f"Output file: {output_file}")
    
    #other custom options are: https://github.com/souzatharsis/podcastfy/blob/main/usage/conversation_custom.md
    custom_config = {
    "word_count": 2000,
    "conversation_style": ["formal", "analytical", "critical"],
    "podcast_name": "Luka's random thoughts on AI coding tools",
    "creativity": 0
    }
    # Generate the podcast with minimal configuration
    generated_file_path = podcastfy_generate(
        text=content,
        conversation_config=custom_config
    )
    
    print(f"Generated file path: {generated_file_path}")
    
    # Copy the generated file to our desired location
    if generated_file_path and os.path.exists(generated_file_path):
        shutil.copy2(generated_file_path, output_file)
        print(f"Copied audio file to: {output_file}")
    else:
        print(f"No audio file found at: {generated_file_path}")
    
    return output_file

def update_post_with_podcast_link(post_file, podcast_link):
    with open(post_file, 'r') as f:
        content = f.read()
    
    # Add podcast link to the front matter
    _, fm, post_content = content.split('---', 2)
    front_matter = yaml.safe_load(fm)
    front_matter['podcast_link'] = str(podcast_link)
    
    # Write updated content back to the file
    with open(post_file, 'w') as f:
        f.write('---\n')
        yaml.dump(front_matter, f)
        f.write('---\n')
        f.write(post_content)

def main():
    for post_file, front_matter, content in get_blog_posts():
        title = front_matter.get('title', 'Untitled Post')
        podcast_link = generate_podcast_from_post(post_file, title, content)
        update_post_with_podcast_link(post_file, podcast_link)
        print(f"Generated podcast for {post_file}: {podcast_link}")

if __name__ == "__main__":
    main() 