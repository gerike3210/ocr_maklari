import numpy as np
import pytesseract
import matplotlib.pyplot as plt
from result_ocr import ResultOCR
from my_image import MyImage
from utils import *


class OCR(MyImage):
    custom_config = r"--oem 3 --psm 6"

    def __init__(self, img):
        self.original_img = img
        super().__init__(img)

    def showOriginalImage(self, figsize=(10, 10)):
        h, w = self.original_img.shape

        # Create a figure and axis for the plot
        _, ax = plt.subplots(figsize=figsize)

        # Use imshow to display the binary image
        # cmap='gray' displays the binary image in grayscale
        ax.imshow(self.original_img, cmap="gray", origin="upper", extent=[0, w, h, 0])

        # Set axis labels
        ax.set_xlabel("X")
        ax.set_ylabel("Y")

        x_ticks = np.arange(0, w, 200)
        y_ticks = np.arange(0, h, 10)
        ax.set_xticks(x_ticks)
        ax.set_yticks(y_ticks)

        # Show the plot
        plt.show()

    def ocrWord(self, lang):
        return ResultOCR(
            pytesseract.image_to_string(self.img, config=OCR.custom_config, lang=lang)
        )

    def getWordsFromColumn(self, langBoolean):  # OCR at 1 column
        words = []
        img_dict = {"c": [], "x": [], "img": []}

        cnts = self.dilate((3, 3)).connectHorizontalPixels().getCnts()

        for c in cnts:
            x, y, w, h = c
            img_dict["c"].append(c)

            tmp_img = OCR(getPartImg(self.original_img, c))
            img_dict["img"].append(OCR(getPartImg(self.original_img, c)))
            tmp_img_x = tmp_img.connectVerticalPixels().getCnts()[0][0]
            img_dict["x"].append(tmp_img_x)

        avg_x = int(np.average(img_dict["x"]))
        last_short = False
        lang = "deu+equ" if langBoolean == 0 else "hun"
        last_added_img = img_dict["img"][0]

        for idx, x_value in enumerate(img_dict["x"]):
            final_img = OCR(img_dict["img"][idx].img.copy())
            curr_img = final_img.img

            if not (avg_x * 0.2 < x_value < avg_x * 1.8):
                if last_short:
                    words.pop()  # utolso elem kivesszuk
                    concatenated = np.concatenate((curr_img, last_added_img), axis=0)
                    final_img = OCR(concatenated)

                last_short = True

            else:
                if last_short:
                    # es a jelenlegi hosszu
                    words.pop()  # utolso elem kivesszuk
                    concatenated = np.concatenate((curr_img, last_added_img), axis=0)
                    final_img = OCR(concatenated)

                last_short = False

            last_added_img = final_img.img.copy()
            final_img = final_img.resizeHeight(60).setBorder((15, 15, 15, 15))

            ocr_result = final_img.ocrWord(lang).cleanResult()
            words.append(ocr_result)

        return words

    def separateTwoCols(self):
        # result black bground, two big white text chunks
        columns = []

        cnts = self.dilate((5, 5), 3).connectVerticalPixels().getCnts()
        for c in cnts:
            x, y, w, h = c
            columns.append(OCR(self.original_img[y : y + h, x : x + w]))

        return columns

    def processTwoColumnImg(self):
        dict_parts = []
        cols = self.separateTwoCols()
        if len(cols) != 2:
            raise Exception("Incorrect image. Please retry!")

        for idx, col in enumerate(cols):
            dict_parts.append(col.getWordsFromColumn(idx))

            # Use zip to combine the two arrays, filtering out empty keys and values
        my_dict = [(k, v) for k, v in zip(dict_parts[0], dict_parts[1]) if k and v]

        return dict(my_dict)
