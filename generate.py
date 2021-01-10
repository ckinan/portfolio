"""
    - Generate site layout
        - Header
        - Body
        - Footer
    - Generate templates
        - Blog
        - About
    - Generate blog posts
        - Markdown support
"""

from string import Template

template = Template('Hey ${CODE}')
print(template.substitute(CODE=123))
