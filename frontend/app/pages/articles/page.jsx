"use client";
import Image from "next/image";
import Link from "next/link";
import { msgConfirm, msgError, msgSuccess } from "@/app/utils/msg";
import LikeComment from "@/app/components/LikeComment/LikeComment";
import { Loader } from "@/app/components/Loader/Loader";
import { useSendTokenQuery } from "@/app/lib/features/auth";
import {
  useDeleteArticleMutation,
  useGetAllPostsQuery,
} from "@/app/lib/features/post";
import { useToggleLikeMutation } from "@/app/lib/features/like";

export default function Articles() {
  const { data, isLoading } = useGetAllPostsQuery();
  const { data: userToken } = useSendTokenQuery();  
  const [deleteArticle, { isLoading: articleLoading }] =
    useDeleteArticleMutation();
  const [toggleLike, {}] = useToggleLikeMutation();
  const addRemoveLike = (postId, userId) => {
    toggleLike({ postId, userId }).then((res) => {
      console.log(res);
      res?.error?.status > 201
        ? msgError(res?.error?.data?.message)
        : msgSuccess(res?.data?.message);
    });
  };
  const articleDeleted = (id) => {
    deleteArticle(id).then((res) => {
      res?.error?.status > 201
        ? msgError(res?.error?.data?.message)
        : msgSuccess(res?.data?.message);
      console.log(res);
    });
  };

  return (
    <>
      {isLoading || articleLoading ? <Loader /> : null}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 mt-marginGlobal mb-marginGlobal w-[80%] mx-auto">
        {data?.data?.map((post) => {
          return (
          <div key={post.id}>
              <article
         
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
           <LikeComment
             post={post}
             addRemoveLike={() => addRemoveLike(post?.id, userToken?.id)}
             userToken={userToken}
           />
         </div>
       </article>
          </div>
          );
        })}
      </section>
    </>
  );
}
