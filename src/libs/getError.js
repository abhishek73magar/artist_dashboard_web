import toast from "react-hot-toast"
import { REMOVEAUTH_TOKEN } from "./jwtToken";

const noRedirect = ['/api/login']

export const getError = (error) => {
  if(error.response){
    const dd = error.response.data;
    if(typeof dd === 'object') return dd.message ?? dd.error ?? JSON.stringify(dd);
    return !dd || dd === '' ? error.message : dd
  }
  return error.message ?? error
}

export const logError = (error) => {
  const msg = getError(error)
  console.error(msg)
  return msg;
}

export const displayError = (error) => {
  return toast.error(getError(error));
}

export const checkError = (error) => {
  if(error.response){
    const { url } = error.response.config;
    if(error.response.status === 401){
      REMOVEAUTH_TOKEN()
      if(!noRedirect.includes(url)) window.location.reload(true);
    }
  }
  return Promise.reject(error);
}

export const zodError = (errors, name) => {
  const keys = name.split('.');
  let dd = errors;

  for(let key of keys){
    dd = dd[key];
    if(dd === undefined) return null;
    if(dd.message) return dd.message;
    if(Array.isArray(dd) && dd.length > 0){
      const first = dd[0];
      const first_key = Object.keys(first)[0];
      if(first_key && first[first_key].message) return first[first_key].message;
    }
  }

  return null
}