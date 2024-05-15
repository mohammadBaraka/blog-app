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
            Material Tailwind
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          {isSuccess ? (
            <div className="hidden gap-2 lg:flex lg:items-center lg:gap-3 font-mainFont">
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
