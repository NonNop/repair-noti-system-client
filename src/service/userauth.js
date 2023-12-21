import axios from "axios";

export const currentUser = async (authtoken) =>
  await axios.post(
    `http://localhost:5000/api/current-user`,
    {},
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );

export const currentAdmin = async (authtoken) =>
  await axios.post(
    `http://localhost:5000/api/current-admin`,
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
