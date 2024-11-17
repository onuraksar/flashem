export const cookieLastActivityKey = "flashem-last-activity"

export const setCookie = (key: string, value: string | boolean | number) => {
  const expires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)).toUTCString();
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; expires=${expires}`;
}

export const getCookie = (key: string) => {
  const name = key + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return undefined;
}