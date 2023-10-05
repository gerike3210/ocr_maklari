import { getStoredDict } from "./get-stored-dict";
import { Storage } from "aws-amplify";

export const setDictS3 = async (dict, id) => {
  try {
    const dictCopy = structuredClone(dict);
    const stored = await getStoredDict(id);
    Object.keys(dictCopy).forEach((key) => {
      if (stored.hasOwnProperty(key)) {
        if (stored[key] === dictCopy[key]) {
          delete dictCopy[key];
        }
      }
    });

    const uploadObject = Object.assign(stored, dictCopy);
    const jsn = JSON.stringify(uploadObject);
    const blob = new Blob([jsn], { type: "application/json" });
    const file = new File([blob], "file.json");

    Storage.put(`${id}.json`, file)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
