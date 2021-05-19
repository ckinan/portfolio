import os
import frontmatter
from Post import Post


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
