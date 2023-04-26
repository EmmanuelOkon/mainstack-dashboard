import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState, useReducer } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { RiDashboardLine } from "react-icons/ri";
import {
  MdOutlinePeopleOutline,
  MdOutlineModeEditOutline,
  MdDeleteOutline,
  MdOutlineSubscriptions,
  MdFilePresent,
  MdOutlineAccessAlarm,
} from "react-icons/md";
import { AiOutlineHourglass } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { TbCameraPlus } from "react-icons/tb";

const initialState = [
  { name: "Dashboard", href: "/", icon: RiDashboardLine },
  {
    name: "Item 1",
    href: "/profile/item1",
    icon: MdOutlineModeEditOutline,
  },
  { name: "Item 2", href: "/profile/item2", icon: MdOutlinePeopleOutline },
  { name: "Item 3", href: "/profile/item3", icon: AiOutlineHourglass },
  {
    name: "OTHERS 1",

    children: [
      { name: "Item 4", href: "/profile/others-1/item4", icon: TbCameraPlus },
      {
        name: "Item 5",
        href: "/profile/others-1/item5",
        icon: MdDeleteOutline,
      },
    ],
  },
  {
    name: "OTHERS 2",

    children: [
      {
        name: "Item 6",
        href: "/profile/others-2/item6",
        icon: MdOutlineSubscriptions,
      },
      { name: "Item 7", href: "/profile/others-2/item7", icon: MdFilePresent },
      {
        name: "Item 8",
        href: "/profile/item8",
        icon: MdOutlineAccessAlarm,
      },
    ],
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT":
      return state.map((item, index) =>
        index === action.payload
          ? { ...item, current: true }
          : { ...item, current: false }
      );
    default:
      return state;
  }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();
  console.log(router.pathname);

  return (
    <div className="h-screen flex overflow-hidden bg-white ">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 mr-4 pt-5">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-8 w-8 rounded-full focus:outline-none text-[#131316]"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <XIcon aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                {/* <div className="flex-shrink-0 flex items-center px-4">
                  <Image src="/main.png" alt="Main" width={40} height={40} />
                </div> */}
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => {
                    if (item.children) {
                      return (
                        <li key={item.name} className="list-none">
                          <span className=" flex items-center px-2 py-2 text-sm font-medium pl-[54px]">
                            {item.name}
                          </span>
                          <ul>
                            {item.children.map((child) => (
                              <li key={child.name} className="list-none">
                                <Link href={child.href}>
                                  <span
                                    className={classNames(
                                      item.current
                                        ? "border-l-[#FF5403] border-l-[3px] text-[#FF5403] font- text-[20px]"
                                        : "text-[#4D5760] hover:bg-orange-100 hover:bg-opacity-",
                                      "group flex items-center px-2 py-[12px] text-sm font-bold pl-[54px] cursor-pointer"
                                    )}
                                  >
                                    {child.icon && (
                                      <child.icon
                                        className={classNames(
                                          item.current
                                            ? "text-[#FF5403]"
                                            : "text-[#4D5760]",
                                          "mr-[12px] flex-shrink-0 h-6 w-6"
                                        )}
                                        aria-hidden="true"
                                      />
                                    )}
                                    {child.name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    } else {
                      return (
                        <li key={item.name} className="list-none">
                          <Link href={item.href}>
                            <span
                              className={classNames(
                                router.pathname === item.href
                                  ? "border-l-[#FF5403] border-l-[3px] text-[#FF5403] text-[20px]"
                                  : "text-[#4D5760] hover:bg-orange-100 hover:bg-opacity-",
                                "group flex items-center  py-[12px] text-sm font-bold pl-[54px] cursor-pointer"
                              )}
                            >
                              {item.icon && (
                                <item.icon
                                  className={classNames(
                                    router.pathname === item.href
                                      ? "text-[#FF5403]"
                                      : "text-[#4D5760]",
                                    "mr-[12px] flex-shrink-0 h-6 w-6"
                                  )}
                                  aria-hidden="true"
                                />
                              )}
                              {item.name}
                            </span>
                          </Link>
                        </li>
                      );
                    }
                  })}
                </nav>
              </div>
              <div className="justify-between  border-t border-gray-200 p-4">
                <div className="flex pr-[16px] ">
                  <div className="flex items-center  w-full">
                    <Image
                      className="inline-block h-9 w-9 rounded-full"
                      width={36}
                      height={36}
                      src="/profileImage.png"
                      alt="profile"
                    />
                    <div className="ml-3">
                      <a
                        href="#"
                        className="text-[15px] font-semibold text-[#56616B]"
                      >
                        Blessing Daniels
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BsThreeDots className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className="hidden bg-white md:flex md:flex-shrink-0 border-r-gray-100 border-r-2 ">
        <div className="flex flex-col w-[304px]">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 flex flex-col pt-[24px]  pb-4 overflow-y-auto scrollbar-none">
              <div className="flex items-center flex-shrink-0 pl-[54px] ">
                <Image src="/main.png" alt="Main" width={40} height={40} />
              </div>
              <nav className="mt-[32px] flex-1 space-y-[24px] w-full">
                <ul>
                  {navigation.map((item) => {
                    if (item.children) {
                      return (
                        <li key={item.name}>
                          <span className="group flex items-center px-2 py-2 text-sm font-medium pl-[54px]">
                            {item.name}
                          </span>
                          <ul>
                            {item.children.map((child) => (
                              <li key={child.name}>
                                <Link href={child.href}>
                                  <span
                                    className={classNames(
                                      router.pathname === item.href
                                        ? "border-l-[#FF5403] border-l-[3px] text-[#FF5403] font- text-[20px]"
                                        : "text-[#4D5760] hover:bg-orange-100 hover:bg-opacity-",
                                      "group flex items-center px-2 py-[12px] text-sm font-bold pl-[54px] cursor-pointer"
                                    )}
                                  >
                                    {child.icon && (
                                      <child.icon
                                        className={classNames(
                                          router.pathname === item.href
                                            ? "text-[#FF5403]"
                                            : "text-[#4D5760]",
                                          "mr-[12px] flex-shrink-0 h-6 w-6"
                                        )}
                                        aria-hidden="true"
                                      />
                                    )}
                                    {child.name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    } else {
                      return (
                        <li key={item.name}>
                          <Link href={item.href}>
                            <span
                              className={classNames(
                                router.pathname === item.href
                                  ? "border-l-[#FF5403] border-l-[3px] text-[#FF5403] font- text-[20px]"
                                  : "text-[#4D5760] hover:bg-orange-100 hover:bg-opacity-",
                                "group flex items-center px-2 py-[12px] text-sm font-bold pl-[54px] cursor-pointer"
                              )}
                            >
                              {item.icon && (
                                <item.icon
                                  className={classNames(
                                    router.pathname === item.href
                                      ? "text-[#FF5403]"
                                      : "text-[#4D5760]",
                                    "mr-[12px] flex-shrink-0 h-6 w-6"
                                  )}
                                  aria-hidden="true"
                                />
                              )}
                              {item.name}
                            </span>
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </nav>
            </div>
            <div className=" flex pl-[54px] pr-[16px] bg-red-90 py-2 border-t border-gray-200  ">
              <div className="md:flex items-center w-full">
                <Image
                  className="inline-block h-9 w-9 rounded-full"
                  width={36}
                  height={36}
                  src="/profileImage.png"
                  alt="profile"
                />

                <div className="flex items-center justify-between w-full">
                  <div className="ml-3">
                    <a
                      href="#"
                      className="text-[15px] font-semibold text-[#56616B]"
                    >
                      Blessing Daniels
                    </a>
                  </div>
                  <BsThreeDots className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden flex items-center justify-between pl-1 pt-1 sm:pl-3 sm:pt-3 border-b">
          <div className="flex items-center l-[54px] ">
            <Image src="/main.png" alt="Main" width={40} height={40} />
          </div>
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-[#131316]  focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
