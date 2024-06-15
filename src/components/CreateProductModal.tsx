import { useCreateObject } from "@/services/create-object";
import { Dialog, DialogPanel } from "@headlessui/react";
import React, { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import TinyLoader from "./TinyLoader";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface CreateProductModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const productSchema = z.object({
  name: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  capacity: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  color: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
});

type productValues = z.infer<typeof productSchema>;

const CreateProductModal: React.FunctionComponent<CreateProductModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const createObject = useCreateObject();
  const closeModal = () => {
    setIsOpen(false);
  };
  const methods = useForm();
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<productValues>({
    resolver: zodResolver(productSchema),
  });
  function onSubmit(data: productValues) {
    if (data.name && data.color && data.capacity) {
      const payload = {
        name: data.name,
        color: data.color,
        capacity: data.capacity,
      };

      createObject.mutate({ payload });
    }
  }

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div className="fixed inset-0 z-30 bg-[#000000cc]">
        <DialogPanel
          className={
            "absolute left-1/2 top-1/2 flex min-h-[24.5rem] max-h-max w-[90%] sm:w-[30rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-[#F2F5FF]"
          }
        >
          <div className="flex h-[64px] bg-white items-end justify-between rounded-t-2xl px-10 py-[0.87rem] text-dash-dark-bg">
            <p>New Product</p>
            <button
              className="flex h-8 w-[4.6rem] cursor-pointer items-center justify-center rounded-md border bg-[#F5F3FF33]"
              onClick={closeModal}
            >
              close
            </button>
          </div>
          <div className="p-5">
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              id="createProductForm"
              className="flex flex-col gap-4 ]"
            >
              <div>
                <div className="text-sm lg:text-base font-light flex gap-x-2">
                  <label htmlFor="product-name">Name</label>
                </div>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Enter product name"
                  className=" p-3 focus:outline-none  text-sm w-full rounded-lg border  placeholder:text-sm placeholder:text-gray-600"
                />
                {errors?.name && (
                  <p className="text-red-600 text-xs py-1">
                    {errors?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="text-sm lg:text-base font-light flex gap-x-2">
                  <label htmlFor="">Color</label>
                </div>
                <input
                  {...register("color")}
                  id="color"
                  type="text"
                  placeholder="Enter Color Name"
                  className=" p-3 focus:outline-none text-sm  w-full rounded-lg border  placeholder:text-sm placeholder:text-gray-600"
                />
                {errors?.color && (
                  <p className="text-red-600 text-xs py-1">
                    {errors?.color?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="text-sm lg:text-base font-light flex gap-x-2">
                  <label htmlFor="">Capacity</label>
                </div>
                <input
                  {...register("capacity")}
                  id="capacity"
                  type="text"
                  placeholder="e.g 256GB"
                  className=" p-3 focus:outline-none text-sm  w-full rounded-lg border  placeholder:text-sm placeholder:text-gray-600"
                />
                {errors?.capacity && (
                  <p className="text-red-600 text-xs py-1">
                    {errors?.capacity?.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                form="createProductForm"
                className="bg-[#032282] text-white hover:bg-[#032282] text-sm w-max font-medium py-2 px-8 mt-5 rounded flex justify-center items-center"
              >
                {createObject.isPending ? <TinyLoader /> : "Create"}
              </button>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateProductModal;
