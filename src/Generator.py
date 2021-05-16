from jinja2 import Template
import json
import os
import frontmatter
import shutil
import commonmark


class Generator:

    @staticmethod
    def generate():
        # Read posts
        all_posts = PostService.find_posts_by_path('../blog')
        all_posts_by_year = PostService.calculate_posts_by_year(all_posts)

        # Render pages
        index_page = TemplateService.render(
            FileUtils.read_file("../resources/layout.html"),
            {
                "title": "Home",
                "content": TemplateService.render(
                    FileUtils.read_file("../resources/index.html"),
                    {
                        "posts_by_year": all_posts_by_year
                    }
                )
            }
        )

        about_page = TemplateService.render(
            FileUtils.read_file("../resources/layout.html"),
            {
                "title": "About",
                "content": FileUtils.read_file("../resources/about.html")
            }
        )

        error_page = TemplateService.render(
            FileUtils.read_file("../resources/layout.html"),
            {
                "title": "Oops!",
                "content": FileUtils.read_file("../resources/404.html")
            }
        )

        # Write pages (Home, About, 404)
        if os.path.isdir('../public'):
            shutil.rmtree('../public')

        os.makedirs('../public')
        os.makedirs('../public/about')
        os.makedirs('../public/blog')
        shutil.copy('../resources/styles.css', '../public/')
        shutil.copy('../resources/favicon.ico', '../public/')

        FileUtils.write_file('../public/index.html', index_page)
        FileUtils.write_file('../public/about/index.html', about_page)
        FileUtils.write_file('../public/404.html', error_page)

        # Write posts
        for post in all_posts:
            print(f'generate.py: Processing post: {post.slug}')

            path = f'../public/blog/{post.slug}'
            os.makedirs(path)

            images_dir = f'../blog/{post.directory}/images'
            if os.path.isdir(images_dir):
                shutil.copytree(images_dir, f'../public/blog/{post.slug}/images')

            html = commonmark.commonmark(post.content)

            post_content = TemplateService.render(
                FileUtils.read_file("../resources/post.html"),
                {
                    "title": post.title,
                    "date": post.date,
                    "content": html
                }
            )

            post_page = TemplateService.render(
                FileUtils.read_file("../resources/layout.html"),
                {
                    "title": post.title,
                    "content": post_content
                }
            )

            FileUtils.write_file(f'{path}/index.html', post_page)


class TemplateRenderer:

    @staticmethod
    def render(template: str, data: dict) -> dict:
        """
            Renders the given template applying the given data
        """
        j2_template = Template(template)
        return j2_template.render(data)


class Post:

    def __init__(self, title, date, slug, directory, content):
        self.title = title
        self.date = date
        self.slug = slug
        self.directory = directory
        self.content = content

    def __repr__(self):
        return json.dumps(self.__dict__)


class PostService:

    @staticmethod
    def find_posts_by_path(path):
        posts = os.listdir(path)
        posts_unsorted = list()

        for directory in posts:
            post = frontmatter.load(f'../blog/{directory}/index.mdx')
            posts_unsorted.append(
                Post(
                    post["title"],
                    post["date"],
                    post["slug"],
                    directory,
                    post.content
                )
            )

        return sorted(
            posts_unsorted,
            key=lambda x: x.date,
            reverse=True
        )

    @staticmethod
    def calculate_posts_by_year(all_posts: list) -> dict:
        posts_by_year = list()
        current_year = -1

        for post in all_posts:
            if post.date.year != current_year:
                current_year = post.date.year
                year = dict()
                year['value'] = current_year
                year['posts'] = list()
                posts_by_year.append(year)

            current_year_object = posts_by_year[-1]
            posts = current_year_object['posts']
            posts.append(post)

        return posts_by_year


class TemplateService:

    @staticmethod
    def render(template: str, data: dict) -> dict:
        """
            Renders the given template applying the given data
        """
        j2_template = Template(template)
        return j2_template.render(data)


class FileUtils:

    @staticmethod
    def read_file(path: str) -> str:
        f = open(path, "r")
        return f.read()

    @staticmethod
    def write_file(absolute_path: str, content: str):
        f = open(absolute_path, "w")
        f.write(content)
        f.close()
