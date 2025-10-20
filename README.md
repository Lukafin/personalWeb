Personal Site with Blog

A Jekyll-based personal blog website focused on sharing written updates and articles.

## Features

- 🎨 Modern, responsive design
- 📝 Blog post support with Markdown
- 🔄 GitHub Actions workflow for continuous deployment
- 🎯 SEO optimized

## Prerequisites

- Ruby (2.7.0 or higher)
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

3. Run the Jekyll site locally:
   ```bash
   bundle exec jekyll serve
   ```
   The site will be available at `http://localhost:4000`

## Project Structure

- `_posts/` - Blog post markdown files
- `_layouts/` - Jekyll layout templates
- `assets/` - Static assets (images, CSS, JS)
- `.github/workflows/` - GitHub Actions workflow configurations
- `index.html` - Landing page for the site

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

## Deployment

The site is automatically deployed through GitHub Pages when changes are pushed to the main branch. The GitHub Actions workflow handles:
- Building the Jekyll site
- Deploying to GitHub Pages

## License

This project is licensed under the MIT License - see the LICENSE file for details.
