"use client";
import { useGetAllCategoriesQuery } from "@/app/lib/features/category";
import Link from "next/link";
import { Loader } from "../Loader/Loader";
export const TopCategories = () => {
  const { data, isLoading } = useGetAllCategoriesQuery();
  return (
    <>
      {isLoading ? <Loader /> : null}
      <div className="mt-12 text-center">
        <h2 className="text-lg lg:text-4xl font-bold font-mainFont text-grayColor">
          Top Categories
        </h2>
        <div className=" flex justify-center items-center mt-8 gap-8 text-white font-bold text-xl ">
          {data?.data.slice(0, 5).map((category) => {
            return (
              <div
                key={category?.id}
                className="w-24 h-8 rounded-full bg-gradient-to-tl from-red-300 to-pink-400 flex justify-center items-center "
              >
                <Link href={`pages/categories/${category?.id}`}>
                  {category?.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
