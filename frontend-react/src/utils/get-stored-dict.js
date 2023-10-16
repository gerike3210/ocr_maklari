import { Storage } from "aws-amplify";

export const getStoredDict = async (id) => {
  try {
    const result = await Storage.get(`${id}.json`, {
      download: true,
      validateObjectExistence: true,
    });

    return JSON.parse(await result.Body.text());
  } catch (err) {
    console.log(err);
    return {};
  }
};
