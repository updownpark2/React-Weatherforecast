import { DefaultTheme } from "styled-components";
interface Default {
  bgcolor: string;
  textColor: string;
  accentColor: string;
}

export const lightTheme: DefaultTheme = {
  bgcolor: "#fff",
  textColor: "#222",
  accentColor: "#12cbef",
};
export const darkTheme: DefaultTheme = {
  bgcolor: "#282c35",
  textColor: "#fff",
  accentColor: "#ffe246",
};
