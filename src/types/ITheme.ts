import { DefaultTheme } from "styled-components";

export interface ITheme extends DefaultTheme {
  colors: {
    primary: string;
    secondary: string;
    alternative: string;
  }
}
