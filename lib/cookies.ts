import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const MAX_AGE_ACCESS_TOKEN = 60 * 60; 
const MAX_AGE_REFRESH_TOKEN = 60 * 60 * 24 * 7; 

  const getCookieSafeOptions = () => {
    const isSecure =
      typeof window !== "undefined" && window.location.protocol === "https:";

    return {
      path: "/",
      secure: isSecure,
      sameSite: "lax" as const,
    };
  };

export const authCookies = {
  setTokens: (accessToken: string, refreshToken: string) => {
    setCookie(ACCESS_TOKEN_KEY, accessToken, {
      maxAge: MAX_AGE_ACCESS_TOKEN,
      ...getCookieSafeOptions()
    });

    setCookie(REFRESH_TOKEN_KEY, refreshToken, {
      maxAge: MAX_AGE_REFRESH_TOKEN,
      ...getCookieSafeOptions()
    });
  },
  getAccessToken: () => getCookie(ACCESS_TOKEN_KEY),
  getRefreshToken: () => getCookie(REFRESH_TOKEN_KEY),
  clear: () => {
    deleteCookie(ACCESS_TOKEN_KEY, { path: "/" });
    deleteCookie(REFRESH_TOKEN_KEY, { path: "/" });
  },
};
