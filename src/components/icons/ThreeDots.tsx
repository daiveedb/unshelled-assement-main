import * as React from "react";
import { SVGProps } from "react";
const ThreeVerticalDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={16}
    viewBox="0 0 4 16"
    width={4}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={1.6} cy={1.6} fill="#032282" r={1.6} />
    <circle cx={1.6} cy={8.00039} fill="#032282" r={1.6} />
    <circle cx={1.6} cy={14.3998} fill="#032282" r={1.6} />
  </svg>
);
export default ThreeVerticalDots;
