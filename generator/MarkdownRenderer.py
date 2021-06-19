import mistune
import re


class MarkdownRenderer:

    @staticmethod
    def render(content):
        renderer = HighlightRenderer()
        markdown = mistune.Markdown(renderer=renderer)
        return markdown(content)


class HighlightRenderer(mistune.Renderer):

    def header(self, text, level, raw=None):
        header_id = re.sub('[^0-9a-zA-Z]+', '-', text).lower()
        return f'<h{level} id="{header_id}"><a href="#{header_id}" style="margin-right: 0.25rem;">#</a>{text}</h{level}>\n'
