"use client";
import { useForm } from "react-hook-form";
import ContentRegister from "../register/ContentRegister";
import InputRegister from "../register/InputRegister";
import SectionImage from "../register/SectionImage";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useLoginMutation } from "@/app/lib/features/auth";
import { redirect, useRouter } from "next/navigation";
import { msgError, msgSuccess } from "@/app/utils/msg";
export default function Login() {
  const router = useRouter();
  const [login, { isError, error, isLoading }] = useLoginMutation();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await login(data).then((res) =>
      res?.error?.status > 201
        ? msgError(res?.error?.data?.message)
        : msgSuccess(res?.data?.message)
    );
    router.push("/");
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

              <div className="col-span-6  sm:flex sm:items-center sm:gap-4 ">
                <Button
                  loading={isLoading ? true : false}
                  type="submit"
                  className="flex gap-4 items-center  shrink-0 rounded-md border border-blue-600 bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Log In
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Don't have an account?
                  <Link
                    href="/auth/register"
                    className="text-gray-700 underline"
                  >
                    Signup
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
