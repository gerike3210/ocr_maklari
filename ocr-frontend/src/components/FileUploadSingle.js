import { useState } from "react";
import FileBase64 from "react-file-base64";

function FileUploadSingle() {
  const [base64Img, setBase64Img] = useState("");

  const handleUploadClick = () => {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: base64Img,
    };

    // 👇 Uploading the file using the fetch API to the server
    fetch(
      "https://1ejx0l22ta.execute-api.eu-north-1.amazonaws.com/dev/ocr",
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <FileBase64
        onDone={(e) => {
          setBase64Img(e.base64);
        }}
      />

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default FileUploadSingle;
