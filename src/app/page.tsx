"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Skeleton from "@/components/skeleton";
import { useGetAllObjects } from "@/services/get-objects";
import { format } from "date-fns";
import PaginateData from "@/components/paginate-data";
import ProductOptions from "@/components/ProductOptions";
import Image from "next/image";
import AddProductIcon from "@/components/icons/AddProductIcon";
import PageLoader from "@/components/PageLoader";
import CreateProductModal from "@/components/CreateProductModal";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const { data } = useGetAllObjects(currentPage);

  useEffect(() => {
    router.push(`/?page=${currentPage}`);
  }, [currentPage, router]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [isOpen, setIsOpen] = useState(false);
  if (!data) return <PageLoader />;
  return (
    <div className="text-white min-h-screen space-y-14 py-4">
      <div className="flex justify-between px-4 sm:px-10 items-center">
        <h1 className="md:text-2xl text-xl lg:text-3xl font-semibold text-[#032282]">
          Home
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-x-2 text-xs sm:text-sm rounded-md bg-[#032282] p-3 px-5"
        >
          <AddProductIcon />
          Add product
        </button>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {data?.posts?.map(({ _id, name, color, createdAt }: any) => (
          <div
            onClick={() => router.push(`/${_id}`)}
            key={_id}
            className="transition-all text-[#032282] cursor-pointer p-4 border hover:border-[#032282] bg-white h-full shadow-lg rounded-lg flex flex-col"
          >
            <div className="w-full h-[200px] rounded-lg border mb-2 bg-[#c4c4c4] relative flex items-center justify-center">
              <Image
                src={"/image-placeholder.jpeg"}
                alt="placeholder"
                height={100}
                width={100}
                className="object-contain"
              />
            </div>
            <div className="flex justify-between pb-2">
              <p>{name}</p>
              <p className="capitalize text-[black]">{color}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm">
                {format(new Date(createdAt), "yyyy-MM-dd")}
              </p>
              <div className="" onClick={(e) => e.stopPropagation()}>
                <ProductOptions id={_id} />
              </div>
            </div>
          </div>
        ))}
      </section>

      <PaginateData
        pagination={data?.pagination!}
        onPageChange={handlePageChange}
      />

      <CreateProductModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
