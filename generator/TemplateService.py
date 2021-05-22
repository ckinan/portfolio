from jinja2 import Template


class TemplateService:

    @staticmethod
    def render(template: str, data: dict) -> dict:
        """
            Renders the given template applying the given data
        """
        j2_template = Template(template)
        return j2_template.render(data)
