import { PREV_PATH } from "libs/config"
import { DECODE_TOKEN } from "libs/jwtToken"
import { redirect } from "react-router-dom"

export const auth = ({ request }) => {
  const { pathname } = new URL(request.url)
  const q = request.url.split('?')[1]
  
  const decode = DECODE_TOKEN()
  if(decode){
    if(pathname === '/login') return redirect('/')
    return null;
  }
  
  if(pathname === '/login') return null;
  localStorage.setItem(PREV_PATH, `${pathname}${q ? "?" + q : ""}`)
  return redirect('/login');
}