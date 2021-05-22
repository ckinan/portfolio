from __future__ import absolute_import, unicode_literals

import re

from commonmark.blocks import Parser
from commonmark.render.html import HtmlRenderer


def commonmark(text):
    parser = Parser()
    ast = parser.parse(text)
    renderer = HtmlRendererExtension()
    return renderer.render(ast)


class HtmlRendererExtension(HtmlRenderer):

    def heading(self, node, entering):
        tagname = 'h' + str(node.level)
        # Give id to the header
        print(re.sub(r'[^a-z0-9]', '_', node.first_child.literal.lower()))<
        attrs = [['id', re.sub(r'[^a-z0-9]', '_', node.first_child.literal.lower())]]
        if entering:
            self.cr()
            self.tag(tagname, attrs)
        else:
            self.tag('/' + tagname)
            self.cr()
