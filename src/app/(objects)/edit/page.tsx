"use client";

import PageLoader from "@/components/PageLoader";
import TinyLoader from "@/components/TinyLoader";
import ChevronLeftIcon from "@/components/icons/ChevronLeftArrow";
import Skeleton from "@/components/skeleton";
import { useEditObject } from "@/services/edit-object";
import { useGetObject } from "@/services/get-object";
import { Label } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditObjectPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data } = useGetObject(id!);
  const updateObject = useEditObject();

  const methods = useForm();

  useEffect(() => {
    methods.reset({
      name: data?.name || null,
      color: data?.color || null,
      capacity: data?.capacity || null,
    });
  }, [data, methods]);

  function onSubmit(data: any) {
    const payload = {
      name: data.name,
      color: data.color,
      capacity: data.capacity,
    };

    updateObject.mutate({ id, payload });
  }

  // if (!data) return <Skeleton />;
  if (!data) return <PageLoader />;
  return (
    <div className="text-black p-4 lg:p-8">
      <button
        onClick={() => window.history.back()}
        className="font-bold rounded-full border w-max p-4 hover:scale-105 mb-5"
      >
        <ChevronLeftIcon height={20} width={20} />
      </button>

      <div className="w-full h-full p-4 sm:p-10 rounded border">
        <h1 className="text-2xl pb-5">Edit Object</h1>

        <form className="flex flex-col gap-4 lg:w-[50%]">
          <div>
            <div className="text-sm lg:text-base font-light flex gap-x-2">
              <label htmlFor="firstname">Name</label>
            </div>
            <input
              {...methods.register("name")}
              id="name"
              type="text"
              placeholder="Enter product name"
              className=" p-3 focus:outline-none  text-sm w-full rounded-lg border placeholder:text-black placeholder:text-sm placeholder:text-gray-600"
            />
          </div>

          <div>
            <div className="text-sm lg:text-base font-light flex gap-x-2">
              <label htmlFor="firstname">Color</label>
            </div>
            <input
              {...methods.register("color")}
              id="color"
              type="text"
              placeholder="Enter Color Name"
              className=" p-3 focus:outline-none text-sm  w-full rounded-lg border placeholder:text-black placeholder:text-sm placeholder:text-gray-600"
            />
          </div>

          <div>
            <div className="text-sm lg:text-base font-light flex gap-x-2">
              <label htmlFor="firstname">Capacity</label>
            </div>
            <input
              {...methods.register("capacity")}
              id="capacity"
              type="text"
              placeholder="e.g 256GB"
              className=" p-3 focus:outline-none text-sm  w-full rounded-lg border placeholder:text-black placeholder:text-sm placeholder:text-gray-600"
            />
          </div>
          {/* add button */}
          <button
            onClick={methods.handleSubmit(onSubmit)}
            className="bg-[#032282] text-white hover:bg-[#032282] w-max font-medium py-2 px-8 rounded flex justify-center items-center"
          >
            {updateObject.isPending ? <TinyLoader /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
