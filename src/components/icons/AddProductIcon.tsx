import * as React from "react";
import { SVGProps } from "react";
const AddProductIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        fill="none"
        height={20}
        viewBox="0 0 20 20"
        width={20}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx={10} cy={10} r={9.5} stroke="white" strokeDasharray="3 3" />
        <line
            stroke="white"
            strokeWidth={0.7}
            x1={10.2304}
            x2={10.2304}
            y1={6.6665}
            y2={14.1665}
        />
        <line
            stroke="white"
            strokeWidth={0.7}
            x1={14.1665}
            x2={6.6665}
            y1={10.2309}
            y2={10.2309}
        />
    </svg>
);
export default AddProductIcon;
