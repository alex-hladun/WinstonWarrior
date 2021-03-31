import { Auth } from "aws-amplify";
import axios from "axios";

export const authenticatedAxios = async (
  method,
  endpoint,
  payload: null | any = null
) => {
  let authToken;
  try {
    const authedUser = await Auth.currentAuthenticatedUser();
    authToken = authedUser.signInUserSession.idToken.jwtToken;
    console.log("AUTHENTICATED FETCH WITH COGNITO");
  } catch (err) {
    console.log("err authenticating");
    console.log(err); // this means there is no currently authenticated user
  }

  switch (method) {
    case "POST":
      return await axios.post(endpoint, payload, {
        headers: {
          Authorization: authToken
        }
      });
    case "GET":
      return await axios.get(endpoint, {
        headers: {
          Authorization: authToken
        }
      });
    case "PUT":
      console.log(
        "🚀 ~ file: authenticatedAxios.ts ~ line 35 ~ payload",
        payload
      );
      return await axios.put(endpoint, payload, {
        headers: {
          Authorization: authToken
        }
      });
    case "DELETE":
      return await axios.delete(endpoint, {
        headers: {
          Authorization: authToken
        }
      });
  }
};
