import { jwtDecode } from "jwt-decode";

export const getDecodedUser = (token: string) => {
  return jwtDecode(token);
};
