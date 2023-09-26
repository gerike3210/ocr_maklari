import { useEffect, useState } from "react";

const Fetch = () => {
  const [words, setWords] = useState({});
  const [loading, setLoading] = useState(false);

  const postOcr = async () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: "https://ocr-test-images-20230925.s3.eu-north-1.amazonaws.com/img8.jpg",
    };

    try {
      const response = await fetch(
        "https://1ejx0l22ta.execute-api.eu-north-1.amazonaws.com/dev/ocr",
        requestOptions
      );
      setWords(await response.json());
    } catch (err) {
      setWords({ error: err.messagae });
    }

    setLoading(false);
  };

  return (
    <>
      <button onClick={postOcr}>FETCH</button>
      {loading && "LOADING"}
      {!loading && JSON.stringify(words)}
    </>
  );
};

export default Fetch;
