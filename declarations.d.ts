declare module "*.png"  { const src: any; export default src; }
declare module "*.jpg"  { const src: any; export default src; }
declare module "*.jpeg" { const src: any; export default src; }
declare module "*.webp" { const src: any; export default src; }
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
