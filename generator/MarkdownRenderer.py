import mistune
import re
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
import traceback


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

    def block_code(self, code, lang=None):
        if not lang:
            lang = 'text'

        try:
            code = highlight(
                code,
                get_lexer_by_name(lang, stripall=True),
                HtmlFormatter(
                    noclasses=True,
                    # linenos='table',
                )
            )
            return code
        except:
            print(lang)
            traceback.print_exc()
            return f'<pre class="{lang}"><code>{mistune.escape(code)}</code></pre>\n'

