import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import FileBase64 from "react-file-base64";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Test from "../auth/Test";

function FileUploadSingle({ user }) {
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
      const data = await response.json();
      setDict(data);
      console.log(data);
    } catch (err) {
      console.log({ err });
      setDict({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="px-4 my-5">
        <Col sm={6}>
          <FileBase64
            onDone={(e) => {
              setBase64Img(e.base64);
            }}
          />
          <button onClick={handleUploadClick}>Upload</button>

          {loading && <h2>LOADING</h2>}
          {!loading && Boolean(Object.keys(dict).length) && (
            <Test user={user} dict={dict} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default FileUploadSingle;
