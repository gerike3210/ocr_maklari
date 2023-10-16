class ResultOCR:
    def __init__(self, text):
        self.text = text

    def removeDashEndWord(self):
        self.text = self.text.replace("- ", "")
        return self

    def removeNewLine(self):
        self.text = self.text.replace("\n", " ")
        return self

    def cleanResult(self):
        self = self.removeNewLine().removeDashEndWord()
        return self.text
