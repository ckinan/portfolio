import os
import shutil
import commonmark

from FileUtils import FileUtils
from PostService import PostService
from TemplateService import TemplateService


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



