class FileUtils:

    @staticmethod
    def read_file(path: str) -> str:
        f = open(path, "r")
        return f.read()

    @staticmethod
    def write_file(absolute_path: str, content: str):
        f = open(absolute_path, "w")
        f.write(content)
        f.close()
