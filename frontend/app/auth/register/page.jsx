"use client";
import * as React from "react";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import SectionImage from "./SectionImage";
import ContentRegister from "./ContentRegister";
import InputRegister from "./InputRegister";
import { useAddUserMutation } from "@/app/lib/features/auth";
import { useRouter } from "next/navigation";
import { msgError, msgSuccess } from "@/app/utils/msg";

export default function Register() {
  const router = useRouter();
  const [createUser, { data, isError, error, isSuccess, isLoading }] =
    useAddUserMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await createUser(data).then((res) =>
      res?.error?.status > 201
        ? msgError(res?.error?.data?.message)
        : msgSuccess(res?.data?.message)
    );
    router.push("/auth/login");
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <SectionImage />
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full lg:max-w-3xl h-auto p-4">
            <ContentRegister />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-12 grid grid-cols-6 gap-6 bg-gray-50 shadow-2xl shadow-[rgb(0_0_0/_30%)] py-12 px-6 rounded-lg"
            >
              <div className="col-span-6 mx-auto">
                <label htmlFor="File" className="rounded-full cursor-pointer">
                  <UserCircleIcon
                    className="w-24 h-24 rounded-full text-blue-600 border border-blue-600"
                    color=""
                  />
                </label>
                <InputRegister
                  hidden
                  variant="static"
                  label=""
                  name="image"
                  type="file"
                  register={register}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <InputRegister
                  variant="standard"
                  label="Name"
                  type="text"
                  name="name"
                  register={register}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputRegister
                  variant="standard"
                  label="Email"
                  type="email"
                  name="email"
                  register={register}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputRegister
                  variant="standard"
                  label="Password"
                  type="password"
                  name="password"
                  register={register}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputRegister
                  variant="standard"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  register={register}
                />
              </div>
              <div className="col-span-6  sm:flex sm:items-center sm:gap-4 ">
                <Button
                  loading={isLoading ? true : false}
                  type="submit"
                  className="flex gap-4 items-center  shrink-0 rounded-md border border-blue-600 bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <Link href="/auth/login" className="text-gray-700 underline">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
