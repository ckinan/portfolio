"""
    - Generate site layout
        - Header
        - Body
        - Footer
    - Generate resources
        - Blog
        - About
    - Generate blog posts
        - Markdown support
"""
print('generate.py: Start generating static site')

from jinja2 import Template
import frontmatter
import commonmark
import os
import shutil


def read_posts(path: str) -> list:
    """
        Returns all posts directories
    """
    posts = os.listdir(path)
    posts_unsorted = list()

    for directory in posts:
        post = frontmatter.load(f'blog/{directory}/index.mdx')
        posts_unsorted.append({
            "title": post["title"],
            "date": post["date"],
            "slug": post["slug"],
            'directory': directory,
            'content': post.content
        })

    return sorted(
        posts_unsorted,
        key=lambda x: x.get('date'),
        reverse=True
    )


def read_file(path: str) -> str:
    f = open(path, "r")
    return f.read()


def render_template(template: str, data: dict) -> dict:
    """
        Renders the given template applying the given data
    """
    j2_template = Template(template)
    return j2_template.render(data)


def write_file(absolute_path: str, content: str):
    f = open(absolute_path, "w")
    f.write(content)
    f.close()


print('generate.py: Reading blog directory')

all_posts = read_posts('blog')

print('generate.py: Rendering templates')

index_content = render_template(
    read_file("resources/index.html"),
    {
        "posts": all_posts
    }
)

index_page = render_template(
    read_file("resources/layout.html"),
    {
        "title": "Home",
        "content": index_content
    }
)

about_page = render_template(
    read_file("resources/layout.html"),
    {
        "title": "About",
        "content": read_file("resources/about.html")
    }
)

not_found_page = render_template(
    read_file("resources/layout.html"),
    {
        "title": "404 Not Found",
        "content": read_file("resources/404.html")
    }
)

print('generate.py: Generating public resources')

if os.path.isdir('public'):
    shutil.rmtree('public')

os.makedirs('public')
os.makedirs('public/about')
os.makedirs('public/blog')
shutil.copy('resources/styles.css', 'public/')

write_file('public/index.html', index_page)
write_file('public/about/index.html', about_page)
write_file('public/404.html', not_found_page)

for post in all_posts:
    print(f'generate.py: Processing post: {post.get("slug")}')

    path = f'public/blog/{post.get("slug")}'
    os.makedirs(path)

    images_dir = f'blog/{post.get("directory")}/images'
    if os.path.isdir(images_dir):
        shutil.copytree(images_dir, f'public/blog/{post.get("slug")}/images')

    html = commonmark.commonmark(post.get('content'))

    post_content = render_template(
        read_file("resources/post.html"),
        {
            "title": post.get("title"),
            "date": post.get("date"),
            "content": html
        }
    )

    post_page = render_template(
        read_file("resources/layout.html"),
        {
            "title": post.get("title"),
            "content": post_content
        }
    )

    write_file(f'{path}/index.html', post_page)

print('generate.py: Done generating static site')
