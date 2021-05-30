import json


class Post:

    def __init__(self, title, date, slug, directory, html):
        self.title = title
        self.date = date
        self.slug = slug
        self.directory = directory
        self.html = html

    def __repr__(self):
        return json.dumps(self.__dict__)
