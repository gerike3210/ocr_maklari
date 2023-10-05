import { useState } from "react";
import { setDictS3 } from "../../utils/set-dict-s3";

const Test = ({ user, dict }) => {
  const [edit, setEdit] = useState(false);
  console.log(user.username);

  return (
    <>
      <ul>
        {Object.entries(dict).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <button onClick={() => setEdit((prevState) => !prevState)}>
        {edit ? "Save" : "Edit"}
      </button>
      <button
        onClick={() => {
          setDictS3(dict, user.username);
        }}
      >
        Upload to S3
      </button>
    </>
  );
};

export default Test;
