"use client";

import { Loader } from "@/app/components/Loader/Loader";
import { useGetAllPostsQuery } from "@/app/lib/features/post";

export default function Articles() {
  const { data, isLoading } = useGetAllPostsQuery();
  console.log(data?.data);
  return (
    <>
      {isLoading ? <Loader /> : null}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 mt-marginGlobal mb-marginGlobal w-[80%] mx-auto">
        {data?.data?.map((post) => {
          return (
            <article
              key={post?.id}
              className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
            >
              <img
                alt=""
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                className="h-56 w-full object-cover"
              />

              <div className="bg-white p-4 sm:p-6">
                <time
                  dateTime="2022-10-10"
                  className="block text-xs text-gray-500"
                >
                  {post?.createdAt}
                </time>

                <a href="#">
                  <h3 className="mt-0.5 text-lg text-gray-900">
                    {post?.title}
                  </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {post?.content}
                </p>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
