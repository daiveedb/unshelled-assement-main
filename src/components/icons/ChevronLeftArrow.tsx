import * as React from "react";
import { SVGProps } from "react";
const ChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={8}
    height={12}
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.25 1.5L1.75 6L6.25 10.5"
      stroke="#354052"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ChevronLeftIcon;
