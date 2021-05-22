from generator.TemplateService import TemplateService
from generator.FileUtils import FileUtils


class PageService:

    @staticmethod
    def render_page(title: str, content: str) -> str:
        return TemplateService.render(
            FileUtils.read_file("resources/layout.html"),
            {
                "title": title,
                "content": content
            }
        )
