"use client";
import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavList from "./NavList";
import Link from "next/link";
import {
  useLoginMutation,
  useLogoutMutation,
  useSendTokenQuery,
} from "@/app/lib/features/auth";
import { useRouter } from "next/navigation";
import { Loader } from "../Loader/Loader";
import { msgConfirm } from "@/app/utils/msg";

export default function NavBarMenu() {
  const router = useRouter();
  const [logout, { data: logutData, isError, isLoading: logoutLoading }] =
    useLogoutMutation();

  const {
    data,
    isError: errorToken,
    isSuccess,
    isLoading,
  } = useSendTokenQuery();
  console.log(data);

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  if (isError) return <div>thome thing went wrang</div>;
  return (
    <>
      {isLoading || logoutLoading ? <Loader /> : null}
      <Navbar className="min-w-full px-4 py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            <svg
              id="logo-85"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="ccustom"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C15.5228 0 20 4.47715 20 10V0H30C35.5228 0 40 4.47715 40 10C40 15.5228 35.5228 20 30 20C35.5228 20 40 24.4772 40 30C40 32.7423 38.8961 35.2268 37.1085 37.0334L37.0711 37.0711L37.0379 37.1041C35.2309 38.8943 32.7446 40 30 40C27.2741 40 24.8029 38.9093 22.999 37.1405C22.9756 37.1175 22.9522 37.0943 22.9289 37.0711C22.907 37.0492 22.8852 37.0272 22.8635 37.0051C21.0924 35.2009 20 32.728 20 30C20 35.5228 15.5228 40 10 40C4.47715 40 0 35.5228 0 30V20H10C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM18 10C18 14.4183 14.4183 18 10 18V2C14.4183 2 18 5.58172 18 10ZM38 30C38 25.5817 34.4183 22 30 22C25.5817 22 22 25.5817 22 30H38ZM2 22V30C2 34.4183 5.58172 38 10 38C14.4183 38 18 34.4183 18 30V22H2ZM22 18V2L30 2C34.4183 2 38 5.58172 38 10C38 14.4183 34.4183 18 30 18H22Z"
                fill="#e74c3c"
              ></path>
            </svg>
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          {isSuccess ? (
            <div className="hidden gap-2 lg:flex lg:items-center lg:gap-3 font-mainFont">
              <Button
                onClick={() =>
                  msgConfirm("want to logout", "info", handleLogout)
                }
                variant="gradient"
                size="sm"
                color="red"
              >
                Logout
              </Button>

              <Link href="/pages/write">
                <Button
                  className="flex justify-center items-center gap-2"
                  variant="gradient"
                  size="sm"
                  color="teal"
                >
                  Write <PencilIcon className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pages/profile">
                <Button
                  variant="text"
                  size="sm"
                  className="flex justify-center items-center rounded-full  bg-blue-gray-50 text-secondaryGray"
                >
                  <p>{data?.name}</p>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden gap-2 lg:flex">
              <Link href="/auth/login">
                <Button variant="text" size="sm" color="blue-gray">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="gradient" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          {isSuccess ? (
            <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
              <Button
                onClick={handleLogout}
                variant="gradient"
                size="sm"
                color="red"
              >
                Logout
              </Button>

              <Link href="/pages/write">
                <Button
                  className="flex justify-center items-center gap-2"
                  variant="gradient"
                  size="sm"
                  color="teal"
                >
                  Write <PencilIcon className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pages/profile">
                <Button
                  variant="text"
                  size="sm"
                  className="flex justify-center items-center rounded-full  bg-blue-gray-50 text-secondaryGray"
                >
                  <p>{data?.name}</p>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
              <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
                Log In
              </Button>
              <Button variant="gradient" size="sm" fullWidth>
                Sign In
              </Button>
            </div>
          )}
        </Collapse>
      </Navbar>
    </>
  );
}
