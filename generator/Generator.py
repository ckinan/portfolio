import os
import shutil

from generator.FileUtils import FileUtils
from generator.PostService import PostService
from generator.TemplateService import TemplateService
from generator.PageService import PageService


class Generator:

    @staticmethod
    def generate():
        # Clean public dir
        Generator.__clean_target_directory()
        Generator.__copy_resources()

        # Read posts
        all_posts = PostService.find_posts_by_path('blog')
        all_posts_by_year = PostService.calculate_posts_by_year(all_posts)

        # Generate content
        index_page, cheatsheets, about_page, error_page = Generator.__generate_pages(all_posts_by_year)
        feed = Generator.__generate_feed(all_posts)

        # Write!
        FileUtils.write_file('public/index.html', index_page)
        FileUtils.write_file('public/cheatsheets/index.html', cheatsheets)
        FileUtils.write_file('public/about/index.html', about_page)
        FileUtils.write_file('public/404.html', error_page)
        FileUtils.write_file('public/rss.xml', feed)
        PostService.write_posts(all_posts)

    @staticmethod
    def __clean_target_directory():
        if os.path.isdir('public'):
            shutil.rmtree('public')

        os.makedirs('public')
        os.makedirs('public/cheatsheets')
        os.makedirs('public/about')
        os.makedirs('public/blog')

    @staticmethod
    def __copy_resources():
        shutil.copy('resources/styles.css', 'public/')
        shutil.copy('resources/favicon.ico', 'public/')

    @staticmethod
    def __generate_feed(items):
        return TemplateService.render(
            FileUtils.read_file("resources/rss.xml"),
            {
                "items": items
            }
        )

    @staticmethod
    def __generate_pages(all_posts_by_year):
        index_page = PageService.render_page(
            "Home",
            TemplateService.render(
                FileUtils.read_file("resources/index.html"),
                {
                    "posts_by_year": all_posts_by_year
                }
            )
        )

        cheatsheets = PageService.render_page(
            "Cheatsheets",
            FileUtils.read_file("resources/cheatsheets.html")
        )

        about_page = PageService.render_page(
            "About",
            FileUtils.read_file("resources/about.html")
        )

        error_page = PageService.render_page(
            "Oops!",
            FileUtils.read_file("resources/404.html")
        )

        return index_page, cheatsheets, about_page, error_page
