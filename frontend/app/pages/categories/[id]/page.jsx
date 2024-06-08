"use client";
import LikeComment from "@/app/components/LikeComment/LikeComment";
import { useSendTokenQuery } from "@/app/lib/features/auth";
import { useGetPostsByCategoryIdQuery } from "@/app/lib/features/post";
import { msgConfirm, msgError, msgSuccess } from "@/app/utils/msg";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function page() {
  const { id } = useParams();
  const { data } = useGetPostsByCategoryIdQuery(id);
  const { data: userToken } = useSendTokenQuery();
  console.log(data?.data);
  const articleDeleted = (id) => {
    deleteArticle(id).then((res) => {
      res?.error?.status > 201
        ? msgError(res?.error?.data?.message)
        : msgSuccess(res?.data?.message);
    });
  };
  return (
    <>
      <div className="w-[80%] mx-auto mt-marginGlobal ">
        <p className="font-bold text-mainColor text-3xl text-center">
          {data?.data ? data?.data[0].Category?.name : "no data"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-8">
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
                    className="flex items-center gap-5 text-xs text-gray-500 "
                  >
                    {post?.createdAt}
                    {post?.userId === userToken?.id && (
                      <div className="flex gap-1">
                        <Image
                          alt="edit"
                          className="cursor-pointer"
                          src="/edit.png"
                          width={25}
                          height={25}
                        />

                        <Image
                          onClick={() =>
                            msgConfirm(
                              `You Wand Delete This (${post?.title})`,
                              "warning",
                              () => articleDeleted(post?.id)
                            )
                          }
                          alt="delete"
                          className="cursor-pointer"
                          src="/delete.png"
                          width={25}
                          height={25}
                        />
                      </div>
                    )}
                  </time>

                  <Link href="#">
                    <h3 className="mt-0.5 text-lg text-gray-900">
                      {post?.title}
                    </h3>
                  </Link>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {post?.content}
                  </p>
                </div>
                <div className="flex items-center gap-2 justify-end m-1">
                  <LikeComment post={post} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
