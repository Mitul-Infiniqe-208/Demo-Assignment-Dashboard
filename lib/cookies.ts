import Cookies from "js-cookie";

const TOKEN_KEY = "token";

export const authCookies = {
  setToken: (token: string) =>
    Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: "strict" }),
  getToken: () => Cookies.get(TOKEN_KEY),
  removeToken: () => Cookies.remove(TOKEN_KEY),
};
