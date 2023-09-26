import { useState } from "react";
import FileBase64 from "react-file-base64";

function FileUploadSingle() {
  const [base64Img, setBase64Img] = useState("");
  const [dict, setDict] = useState({});
  const [loading, setLoading] = useState(false);

  const handleUploadClick = async () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: base64Img,
    };

    try {
      const response = await fetch(
        "https://1ejx0l22ta.execute-api.eu-north-1.amazonaws.com/dev/ocr",
        requestOptions
      );
      setDict(await response.json());
      console.log(dict);
    } catch (err) {
      setDict({ err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FileBase64
        onDone={(e) => {
          setBase64Img(e.base64);
        }}
      />
      <button onClick={handleUploadClick}>Upload</button>

      {loading && <h2>LOADING</h2>}
      {!loading && Boolean(Object.keys(dict).length) && (
        <ul>
          {Object.entries(dict).map((key) => (
            <li>{key}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileUploadSingle;
