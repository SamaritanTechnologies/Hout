import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ProfileDD from "../../assets/DashboardImages/ProfileDD.svg";
import avatars from "../../assets/DashboardImages/avatars.svg";
import more from "../../assets/DashboardImages/more.svg";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../providers";
import { toast } from "react-toastify";

const HeadLessDropDown = ({ token }) => {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left z-10 ">
      <div>
        <Menu.Button className="inline-flex  z-10 w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-black hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <div className="flex items-center gap-x-5 z-10">
            <div className="shrink-0">
              <img src={avatars}/>
            </div>
            <div className="flex-col">
              <div className="text-[14px] w-[max-content]">Name Sur</div>
              <div className="text-[12px] text-[#565656] ">Admin</div>
            </div>
            <div>
              <img src={more} />
            </div>
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-[-12px] mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            <ul className="cursor-pointer">
              <li
                className="text-center"
                onClick={() => navigate("/user-profile")}
              >
                Profile
              </li>
              <li
                className="text-center pt-3 text-red"
                onClick={() => {
                  navigate("/sign-in");
                  setAccessToken(null);
                  localStorage.clear();
                  toast.success("Logged Out!");
                }}
              >
                {token ? "Logout" : "Login"}
              </li>
            </ul>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HeadLessDropDown;
