"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import Image from "next/image";
import {
  useCreateCommentMutation,
  useGetAllCommentsQuery,
} from "@/app/lib/features/comments";
import { msgError, msgSuccess } from "@/app/utils/msg";
export default function LikeComment({ post, addRemoveLike, userToken }) {
  const [createComment, { data, isLoading: isLoadingCreateComment }] =
    useCreateCommentMutation();
  const [open, setOpen] = React.useState(false);
  const [comment, setCommetn] = React.useState({
    content: "",
    userId: userToken?.id,
    postId: post?.id,
  });
  const handleOpen = () => setOpen(!open);
  const userLiked = post?.Likes[0]?.userId === userToken?.id && userToken?.id;

  const addComment = () => {
    createComment({
      content: comment.content,
      postId: comment.postId,
      userId: comment.userId,
    }).then((res) =>
      res?.error?.status > 201
        ? msgError(res?.error?.data?.message)
        : msgSuccess(res?.data?.message)
    );
    handleOpen();
  };

  const handleCommentChange = (e) => {
    setCommetn({ ...comment, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Dialog
        className="flex flex-col gap-4 relative"
        size="md"
        open={open}
        handler={handleOpen}
      >
        <DialogHeader className="text-mainColor font-bold capitalize">
          {post?.user?.name}'s Post
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4 justify-center w-full">
          {post?.Comment?.map((comment) => {
            return (
              <>
                <div className="flex justify-center  gap-8 bg-blue-gray-200 p-2 overflow-auto">
                  <div className="flex items-center justify-end w-full ">
                    <p className="text-md p-2 font-bold text-white overflow-auto bg-secondaryGray rounded-lg">
                      {comment?.content}
                    </p>
                  </div>
                  <div className="flex items-center w-full justify-start">
                    <Image
                      src="/avatar.png"
                      alt=""
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <p className="text-md font-bold text-secondaryGray capitalize">
                      {comment?.user?.name}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </DialogBody>
        <DialogFooter className="flex justify-between items-center">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>close</span>
          </Button>
          <div className="flex items-center gap-4">
            <Input
              color="blue"
              label="Write Comment Here..."
              name="content"
              onChange={handleCommentChange}
            />
            <Button
              onClick={() => addComment("comment", userToken?.id, post?.id)}
              type="submit"
              size="sm"
              variant="gradient"
              color="green"
            >
              <span>Add </span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
      <div className="flex items-center gap-1">
        <p className="text-md font-bold text-secondaryGray">
          ({post?.Comment?.length})
        </p>

        <svg
          onClick={handleOpen}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-mainColor cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </div>
      <p>|</p>
      <div className="flex items-center gap-1">
        <p className="text-md font-bold text-secondaryGray">
          ({post?.Likes?.length})
        </p>
        {userLiked ? (
          <svg
            onClick={addRemoveLike}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-blue-800 cursor-pointer"
          >
            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
          </svg>
        ) : (
          <svg
            onClick={addRemoveLike}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-secondaryGray cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
            />
          </svg>
        )}
      </div>
    </>
  );
}
