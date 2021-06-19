import os
import frontmatter
import shutil

from generator.MarkdownRenderer import MarkdownRenderer
from generator.Post import Post
from generator.TemplateService import TemplateService
from generator.FileUtils import FileUtils


class PostService:

    @staticmethod
    def find_posts_by_path(path):
        posts = os.listdir(path)
        posts_unsorted = list()

        for directory in posts:
            post = frontmatter.load(f'blog/{directory}/index.mdx')
            posts_unsorted.append(
                Post(
                    post["title"],
                    post["date"],
                    post["slug"],
                    directory,
                    MarkdownRenderer.render(post.content)
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

    @staticmethod
    def write_posts(all_posts: list):
        for post in all_posts:
            print(f'generate.py: Processing post: {post.slug}')

            path = f'public/blog/{post.slug}'
            os.makedirs(path)

            images_dir = f'blog/{post.directory}/images'
            if os.path.isdir(images_dir):
                shutil.copytree(images_dir, f'public/blog/{post.slug}/images')

            post_content = TemplateService.render(
                FileUtils.read_file("resources/post.html"),
                {
                    "title": post.title,
                    "date": post.date,
                    "content": post.html
                }
            )

            post_page = TemplateService.render(
                FileUtils.read_file("resources/layout.html"),
                {
                    "title": post.title,
                    "content": post_content
                }
            )

            FileUtils.write_file(f'{path}/index.html', post_page)
