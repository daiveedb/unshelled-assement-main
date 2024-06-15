"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import ThreeVerticalDots from "./icons/ThreeDots";
import Link from "next/link";

const ProductOptions = ({ id }: { id: string }) => {
  const options = ["View Details"];
  const options2 = [
    {
      text: "View details",
      link: `/${id}`,
    },
    {
      text: "Edit object",
      link: `/edit/?id=${id}`,
    },
  ];
  return (
    <div className="" key={id}>
      <Popover className={"relative"}>
        <PopoverButton className={"outline-none pl-5 py-2 pr-2"}>
          <ThreeVerticalDots />
        </PopoverButton>
        <PopoverPanel
          className={
            "p-3 bg-white absolute min-w-[150px] top-full right-0 z-50 border rounded-md flex flex-col gap-y-3"
          }
        >
          {options2.map(
            (item: { text: string; link: string }, index: number) => {
              return (
                <div className="py-2" key={index}>
                  <Link href={item.link}>
                    <div className="text-sm text-center">{item.text}</div>
                  </Link>
                </div>
              );
            }
          )}
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default ProductOptions;
