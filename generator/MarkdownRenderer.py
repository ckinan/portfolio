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
                HtmlFormatterMonkeyPatch(
                    noclasses=True,
                    cssclass='code',
                    linenos='inline',
                )
            )
            return code
        except:
            print(lang)
            traceback.print_exc()
            return f'<pre class="{lang}"><code>{mistune.escape(code)}</code></pre>\n'


class HtmlFormatterMonkeyPatch(HtmlFormatter):

    def _wrap_inlinelinenos(self, inner):
        # need a list of lines since we need the width of a single number :(
        inner_lines = list(inner)
        sp = self.linenospecial
        st = self.linenostep
        num = self.linenostart
        mw = len(str(len(inner_lines) + num - 1))
        la = self.lineanchors
        aln = self.anchorlinenos
        nocls = self.noclasses

        for _, inner_line in inner_lines:
            print_line = num % st == 0
            special_line = sp and num % sp == 0

            if print_line:
                line = '%*d' % (mw, num)
            else:
                line = ' ' * mw

            if nocls:
                if special_line:
                    style = ' style="%s"' % self._linenos_special_style
                else:
                    style = ' style="%s"' % self._linenos_style
            else:
                if special_line:
                    style = ' class="linenos special"'
                else:
                    style = ' class="linenos"'

            if style:
                linenos = '<span%s>%s</span>' % (style, line)
            else:
                linenos = line

            if aln:
                yield 1, ('<a href="#%s-%d">%s</a>' % (la, num, linenos) +
                          inner_line)
            else:
                # yield 1, linenos + inner_line
                # ckinan: Use custom class to render line number
                yield 1, '<span class="l">' + inner_line + '</span>'
            num += 1
