import os
import shutil
from datetime import datetime

from generator.FileUtils import FileUtils
from generator.PageService import PageService
from generator.PostService import PostService
from generator.TemplateService import TemplateService


class Generator:

    @staticmethod
    def generate():
        # Clean public dir
        Generator.__clean_target_directory()
        Generator.__copy_resources()

        # Read posts
        all_posts = PostService.find_posts_by_path('blog')

        # Generate content
        index_page, notes, about_page, error_page = Generator.__generate_pages(all_posts)
        rss = Generator.__generate_feed(all_posts, "resources/rss.xml")

        # Write!
        FileUtils.write_file('public/index.html', index_page)
        FileUtils.write_file('public/notes/index.html', notes)
        FileUtils.write_file('public/about/index.html', about_page)
        FileUtils.write_file('public/404.html', error_page)
        FileUtils.write_file('public/rss.xml', rss)
        PostService.write_posts(all_posts)

    @staticmethod
    def __clean_target_directory():
        if os.path.isdir('public'):
            shutil.rmtree('public')

        os.makedirs('public')
        os.makedirs('public/notes')
        os.makedirs('public/about')
        os.makedirs('public/blog')

    @staticmethod
    def __copy_resources():
        shutil.copy('resources/styles.css', 'public/')
        shutil.copy('resources/favicon.ico', 'public/')

    @staticmethod
    def __generate_feed(items, template):
        return TemplateService.render(
            FileUtils.read_file(template),
            {
                "items": items,
                "currentDate": datetime.utcnow()
            }
        )

    @staticmethod
    def __generate_pages(all_posts):
        all_posts_by_year = PostService.calculate_posts_by_year(all_posts)

        index_page = PageService.render_page(
            "Home",
            TemplateService.render(
                FileUtils.read_file("resources/index.html"),
                {
                    "posts_by_year": all_posts_by_year
                }
            )
        )

        notes = PageService.render_page(
            "Notes",
            FileUtils.read_file("resources/notes.html")
        )

        about_page = PageService.render_page(
            "About",
            TemplateService.render(
                FileUtils.read_file("resources/about.html"),
                {
                    "total_posts": len(all_posts),
                    "last_post_date": all_posts[0].date
                }
            )
        )

        error_page = PageService.render_page(
            "Oops!",
            FileUtils.read_file("resources/404.html")
        )

        return index_page, notes, about_page, error_page
