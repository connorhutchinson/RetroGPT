// src/global.d.ts or src/declarations.d.ts
declare module "*.module.scss" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  const src: string;
  export default src;
}
