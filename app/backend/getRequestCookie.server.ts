import { Cookies } from "./typesBackend";


// This is to get all of the cookies
export const getRequestCookies = (request: Request): Cookies => {
  const cookieString = request.headers.get("Cookie");
  const cookies = cookieString ? cookieString.split("; ") : [];
  const cookieObject: Cookies = {};
  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i].split("=");
    cookieObject[name] = decodeURIComponent(value);
  }
  return cookieObject;
}

// This is to get only one cookie
export const getRequestSingleCookie = (request: Request, cookieName: string): string | null => {
  const cookieString = request.headers.get("Cookie");
  const cookies = cookieString ? cookieString.split("; ") : [];
  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i].split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}