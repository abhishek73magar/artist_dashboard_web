import { jwtDecode } from "jwt-decode";
import moment from "moment";

const auth_token = "AUTH_TOKEN";

export const AUTH_TOKEN = (name) => window.localStorage.getItem(name || auth_token) || null;
export const SETAUTH_TOKEN = (token, name) => window.localStorage.setItem(name || auth_token, token);
export const REMOVEAUTH_TOKEN = (name) => window.localStorage.removeItem(name || auth_token);

export const DECODE_TOKEN = (token) => {
  try {
    const decoded = jwtDecode(token || AUTH_TOKEN());
    if(moment().isAfter(moment.unix(decoded.exp))) {
      REMOVEAUTH_TOKEN();
      throw new Error("Token Expired");
    }
    return decoded;
  } catch (error) {
    console.log("DECODE_TOKEN: ", error.message ?? error)
    return null;
  }
}
