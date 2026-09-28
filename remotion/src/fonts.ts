import { staticFile } from "remotion";

export const fontHeavy = "InterHeavy, 'Helvetica Neue', Arial, sans-serif";
export const fontHand = "CaveatHand, 'Segoe Print', cursive";

export const fontFaceCss = `
@font-face {
  font-family: 'InterHeavy';
  src: url('${staticFile("fonts/Inter-Bold.woff2")}') format('woff2');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'InterHeavy';
  src: url('${staticFile("fonts/Inter-ExtraBold.woff2")}') format('woff2');
  font-weight: 800;
  font-style: normal;
}
@font-face {
  font-family: 'CaveatHand';
  src: url('${staticFile("fonts/Caveat-Bold.woff2")}') format('woff2');
  font-weight: 700;
  font-style: normal;
}
`;
