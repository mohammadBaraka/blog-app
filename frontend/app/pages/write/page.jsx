"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Radio } from "@material-tailwind/react";
import { quillFormats, quillModules } from "./quillOption";
import { useGetAllCategoriesQuery } from "@/app/lib/features/category";
import { useCreateArticleMutation } from "@/app/lib/features/post";
import { useSendTokenQuery } from "@/app/lib/features/auth";
import { msgSuccess, msgError } from "@/app/utils/msg";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function write() {
  const { data, isLoadin: isLoadinCategories } = useGetAllCategoriesQuery();
  const categories = data?.data;
  const [
    createArticle,
    { data: dataArticles, isError, error, isLoading: loadingArticle },
  ] = useCreateArticleMutation();
  const {
    data: userToken,
    isLoading: loadingToken,
    isSuccess: succesToken,
  } = useSendTokenQuery();
  const { register, handleSubmit, setValue, watch } = useForm();
  console.log(succesToken);
  React.useEffect(() => {
    register("content");
  }, [register]);
  const onEditorStateChange = (editorState) => {
    setValue("content", editorState);
  };
  const editorContent = watch("content");

  const onSubmit = async (data) => {
    data.content = plainTextContent;
    await createArticle(data).then((res) =>
      console.log(
        res?.error?.status > 201
          ? msgError(res?.error?.data?.message)
          : msgSuccess(res?.data?.message)
      )
    );
  };

  return (
    <main>
      <div className="w-[95%] h-full mx-auto flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex gap-8">
          <div className=" w-[70vw]">
            <Input
              size="lg"
              variant="outlined"
              color="blue-gray"
              type="text"
              label="Title"
              {...register("title")}
            />
            <QuillEditor
              modules={quillModules}
              formats={quillFormats}
              value={editorContent}
              onChange={onEditorStateChange}
              className="h-[100%] my-4 bg-white"
            />
          </div>
          <div className="w-[15vw] h-[100%] border border-blue-gray-300 p-2 rounded-lg">
            <h3 className="text-lg text-teal-500 text-center font-bold">
              Categories
            </h3>
            <div className="flex flex-col gap-2 mt-4">
              {categories?.map((category) => {
                return (
                  <div key={category?.id}>
                    <Radio
                      color="teal"
                      value={category?.id}
                      name={category?.id}
                      label={category?.name}
                      {...register("categoryId")}
                    />
                  </div>
                );
              })}

              <Button
                color="teal"
                type="submit"
                loading={loadingArticle ? true : false}
              >
                Publish
              </Button>
            </div>
            <Input
              autoFocus
              readOnly
              defaultValue={userToken?.id}
              variant="static"
              type="text"
              {...register("userId")}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
