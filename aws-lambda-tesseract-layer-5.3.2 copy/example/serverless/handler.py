import requests
from PIL import Image
from io import BytesIO
import pytesseract
import urllib.parse  # Add this import for URL decoding


def main(evt, ctx):
    try:
        url = evt["body"]

        decoded_url = urllib.parse.unquote(url)

        res = requests.get(decoded_url)

        if res.status_code == 200:
            img = Image.open(BytesIO(res.content))
            txt = pytesseract.image_to_string(img, lang="deu")
            return {"statusCode": 200, "body": txt}
        else:
            return {
                "statusCode": res.status_code,
                "body": "Failed to download the image.",
            }
    except Exception as e:
        return {"statusCode": 500, "body": f"Error: {str(e)}"}
