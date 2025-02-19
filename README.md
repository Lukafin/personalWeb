Personal Site with Blog and with Podcast Generation

A Jekyll-based personal blog website with an automated podcast generation feature. The site includes a blog section and automatically generates audio versions of blog posts using AI text-to-speech technology.

## Features

- 🎨 Modern, responsive design
- 📝 Blog post support with Markdown
- 🎙️ Automated podcast generation from blog posts
- 🔄 GitHub Actions workflow for continuous deployment
- 🎯 SEO optimized

## Prerequisites

- Ruby (2.7.0 or higher)
- Python (3.8 or higher)
- Node.js (for some JavaScript features)
- Bundler gem

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install Ruby dependencies:
   ```bash
   bundle install
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   # Add your environment variables here
   # Required for podcast generation
   ```

5. Run the Jekyll site locally:
   ```bash
   bundle exec jekyll serve
   ```
   The site will be available at `http://localhost:4000`

## Project Structure

- `_posts/` - Blog post markdown files
- `_layouts/` - Jekyll layout templates
- `assets/` - Static assets (images, CSS, JS)
- `data/` - Generated podcast audio files and transcripts
- `.github/workflows/` - GitHub Actions workflow configurations
- `generate_podcast.py` - Python script for podcast generation

## Writing Blog Posts

1. Create a new markdown file in `_posts/` with the format:
   ```
   YYYY-MM-DD-title-of-post.md
   ```

2. Add front matter at the top of the post:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: YYYY-MM-DD HH:MM:SS +0000
   categories: [category1, category2]
   ---
   ```

## Podcast Generation

The site automatically generates audio versions of blog posts using AI text-to-speech. This process is handled by GitHub Actions when new posts are pushed to the repository.

To generate podcasts locally:
```bash
python generate_podcast.py
```

## Deployment

The site is automatically deployed through GitHub Pages when changes are pushed to the main branch. The GitHub Actions workflow handles:
- Building the Jekyll site
- Deploying to GitHub Pages


## License

This project is licensed under the MIT License - see the LICENSE file for details. 