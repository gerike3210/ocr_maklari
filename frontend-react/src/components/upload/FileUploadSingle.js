import { useState } from "react";
import FileBase64 from "react-file-base64";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Test from "../auth/Test";
import { Button, Container } from "@mui/material";

function FileUploadSingle({ user }) {
  const [base64Img, setBase64Img] = useState("");
  const [dict, setDict] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
      if (response.status !== 200) {
        throw new Error(
          "A mistake has been made\nThe picture should consist of one column of Hungarian and one column of German foreign words.\nMake sure you have a border of the right size around the columns"
        );
      }
      const data = await response.json();
      setDict(data);
      setError(false);
    } catch (err) {
      setError(true);
      setDict({ error: err.message });
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
          <Button
            onClick={handleUploadClick}
            variant="contained"
            disabled={!Boolean(base64Img)}
          >
            Upload
          </Button>

          {loading && <h2>LOADING</h2>}
          {!loading && Boolean(Object.keys(dict).length) && (
            <Test user={user} dict={dict} error={error} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default FileUploadSingle;
