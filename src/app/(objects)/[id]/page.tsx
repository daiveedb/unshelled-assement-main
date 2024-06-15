"use client";

import PageLoader from "@/components/PageLoader";
import ChevronLeftIcon from "@/components/icons/ChevronLeftArrow";
import Skeleton from "@/components/skeleton";
import { useDeleteObject } from "@/services/delete-object";
import { useGetObject } from "@/services/get-object";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SingleObjectPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data } = useGetObject(params.id);
  const deleteObject = useDeleteObject();

  const handleDelete = async () => {
    await deleteObject.mutate(params.id);
  };

  if (!data) return <PageLoader />;
  return (
    <div className="p-4 lg:p-8">
      <button
        onClick={() => window.history.back()}
        className="font-bold rounded-full border w-max p-4 hover:scale-105 mb-5"
      >
        <ChevronLeftIcon height={20} width={20} />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-10 gap-5">
        <div className="md:col-span-3 rounded-lg p-5 border flex flex-col gap-y-3">
          <h1 className="text-2xl font-semibold">{data?.name}</h1>

          <h4>
            Color - <span className="font-bold">{data?.color}</span>
          </h4>

          <h4>
            Capacity - <span className="font-bold">{data?.capacity}</span>
          </h4>

          <h6 className="text-sm">
            Date Created -{" "}
            <span className="font-bold">
              {format(new Date(data?.createdAt), "yyyy-MM-dd: HH:mm:ss")}
            </span>
          </h6>

          <h6 className="text-sm">
            Last Updated -{" "}
            <span className="font-bold">
              {format(new Date(data?.updatedAt), "yyyy-MM-dd: HH:mm:ss")}
            </span>
          </h6>

          <section className="flex h-full items-end ">
            <div className="flex gap-4 h-max">
              <button
                onClick={() => router.push(`/edit?id=${params.id}`)}
                className="bg-[#032282] border border-transparent text-sm text-white min-w-[100px] px-4 py-3 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="border border-[#CD5446] text-[#CD5446] text-sm min-w-[100px]  px-4 py-3 rounded-md"
              >
                Delete
              </button>
            </div>
          </section>
        </div>
        <div className="md:col-span-4 lg:col-span-7 rounded-lg border p-5 h-[250px] md:h-[500px] bg-[#c4c4c4] relative flex items-center justify-center">
          <Image
            src={"/image-placeholder.jpeg"}
            alt="placeholder"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
