import React, { useEffect } from "react";
import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDoubleDownIcon,
  SearchIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";
import { HomeIcon } from "@heroicons/react/solid";

import HeaderIcon from "./headerIcon";
import { signout, useSession } from "next-auth/client";

function header({ sessions }) {
  const [session] = useSession();

  return (
    <div className="sticky top-0 z-50 bg-white flex item-center p-2 lg:px-5 shadow-md">
      <div className="flex items-center">
        <div className="flex xl-2 items-center rounded-full bg-gray-100  p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className=" hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500  flex-shrink"
            type="text"
            placeholder="Search Friends"
          />
        </div>
      </div>

      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon Icon={HomeIcon} />
          <HeaderIcon Icon={HomeIcon} />
          <HeaderIcon Icon={HomeIcon} />
          <HeaderIcon Icon={HomeIcon} />
          <HeaderIcon Icon={HomeIcon} />
        </div>
      </div>

      <div className="flex items-center sm:space-x-2 justify-end ">
        <div
          onClick={signout}
          className="rounded-full cursor-pointer"
          width="40"
          height="40"
          layout="fixed"
        >
          <Image
            src={sessions.user.image}
            alt="hills"
            width={40}
            height={40}
            layout="fixed"
          />
        </div>

        {/* <Image src={} height="40" width="40" /> */}

        <p className="whitespace-nowrap font-semibold br-3">
          {" "}
          {sessions.user.name}
        </p>
        <ViewGridAddIcon className="hidden xl:inline-flex p-2 h-10 w-10 bg-gray-200 rounded-full text-gray-50 cursor-pointer hover:bg-gray-300" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDoubleDownIcon className="icon" />
      </div>
    </div>
  );
}

export default header;
