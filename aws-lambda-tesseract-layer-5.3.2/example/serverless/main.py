try:
    import unzip_requirements
except ImportError:
    pass

import base64
import requests
from PIL import Image
from io import BytesIO
import urllib.parse
import cv2
import numpy as np
from ocr import OCR
from utils import *
import json
import re


def lambda_handler(evt, context):
    try:
        # url = evt["body"]
        # decoded_url = urllib.parse.unquote(url)
        # res = requests.get(decoded_url)
        # img = Image.open(BytesIO(res.content))
        image_data = re.sub("^data:image/.+;base64,", "", evt["body"])
        img = Image.open(BytesIO(base64.b64decode(image_data)))

        np_img = np.array(img)
        gray_image = cv2.cvtColor(np_img, cv2.COLOR_BGR2GRAY)
        ocrInstance = OCR(gray_image)
        ocr_dict = ocrInstance.processTwoColumnImg()
        # for key, value in ocrInstance.processTwoColumnImg().items():
        #     print("{:<50}{:<25}".format(key, value))

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            },
            "body": json.dumps(ocr_dict),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": str(e), "event": evt["body"]}),
        }
