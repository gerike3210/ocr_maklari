import cv2
from matplotlib import pyplot as plt
import numpy as np


class MyImage:
    def __init__(self, img):
        # store as binary img
        self.img = cv2.threshold(
            img.astype(np.uint8), 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
        )[1]

    def showImage(self, figsize=(10, 10)):
        h, w = self.img.shape

        # Create a figure and axis for the plot
        fig, ax = plt.subplots(figsize=figsize)

        # Use imshow to display the binary image
        # cmap='gray' displays the binary image in grayscale
        ax.imshow(self.img, cmap="gray", origin="upper", extent=[0, w, h, 0])

        # Set axis labels
        ax.set_xlabel("X")
        ax.set_ylabel("Y")

        x_ticks = np.arange(0, w, 200)
        y_ticks = np.arange(0, h, 10)
        ax.set_xticks(x_ticks)
        ax.set_yticks(y_ticks)

        # Show the plot
        plt.show()

    def reverse(self):
        self.img = cv2.threshold(
            self.img, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
        )[1]
        return self

    def dilate(self, kernel_size=(1, 1), iterations=1):
        kernel_img = np.ones(kernel_size, np.uint8)
        # az adott kernel erteke 1, ha van a kernel teruleten legalabb egy feher ertek
        self.img = cv2.dilate(self.reverse().img, kernel_img, iterations=iterations)
        self.img = self.reverse().img
        return self

    def connectVerticalPixels(self):
        tmp_boolean_array = np.tile(
            np.any(self.reverse().img, axis=0), (self.img.shape[0], 1)
        )
        self.img = np.where(tmp_boolean_array, 255, 0).astype(np.uint8)
        return self

    def connectHorizontalPixels(self):
        tmp_boolean_array = np.tile(
            np.any(self.reverse().img, axis=1), (self.img.shape[0], 1)
        )
        img_format = np.where(tmp_boolean_array, 255, 0).astype(np.uint8)
        self.img = np.transpose(img_format, (1, 0))
        return self

    def erode(self, kernel_size=(1, 1), iterations=1):
        kernel_img = np.ones(kernel_size, np.uint8)
        self.img = cv2.erode(self.reverse().img, kernel_img, iterations=iterations)
        self.img = self.reverse().img
        return self

    def getCnts(self):
        cnts = cv2.findContours(self.img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts = cnts[0] if len(cnts) == 2 else cnts[1]
        cnts = sorted(cnts, key=lambda x: cv2.boundingRect(x)[0])
        return [cv2.boundingRect(c) for c in cnts]

    def setBorder(self, params):
        top, bottom, left, right = params
        self.img = cv2.copyMakeBorder(
            self.img,
            top,
            bottom,
            left,
            right,
            cv2.BORDER_CONSTANT,
            value=[255, 255, 255],
        )
        return self

    def resizeHeight(self, new_height=32):
        # Calculate the new width to maintain the aspect ratio
        original_height, original_width = self.img.shape
        new_width = int((original_width / original_height) * new_height)

        # Resize the image while maintaining the aspect ratio
        self.img = cv2.resize(
            self.img, (new_width, new_height), interpolation=cv2.INTER_AREA
        )
        return self

    def resizeWidth(self, new_height=200):
        # Calculate the new width to maintain the aspect ratio
        original_height, original_width = self.img.shape[:2]
        new_width = int((original_width / original_height) * new_height)

        # Resize the image while maintaining the aspect ratio
        self.img = cv2.resize(
            self.img, (new_width, new_height), interpolation=cv2.INTER_AREA
        )
        return self
