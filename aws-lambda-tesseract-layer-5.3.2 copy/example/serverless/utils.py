def getImgXPath(imgId):
    return f"./images/img{imgId}.jpg"


def getPartImg(toCutImg, params):
    x, y, w, h = params
    return toCutImg[y : y + h, x : x + w]
