import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import avatars from "../../assets/DashboardImages/avatars.svg";
import more from "../../assets/DashboardImages/more.svg";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../../providers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux";

const HeadLessDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = authState.isLoggedIn;

  const handleLogout = () => {
    dispatch(logoutUser());
    setAccessToken("");
    setRefreshToken("");

    toast.success("Logged Out!");

    setTimeout(() => {
      navigate("/sign-in");
    }, 700);
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-10 ">
      <div>
        <Menu.Button className="inline-flex  z-10 w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-black hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <div className="flex items-center gap-x-5 z-10">
            <div className="shrink-0">
              <img src={avatars} />
            </div>
            <div className="flex-col">
              <div className="text-[14px] w-[max-content]">Admin</div>
              {/* <div className="text-[12px] text-[#565656] ">Admin</div> */}
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
        <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-2">
            <ul className="cursor-pointer">
              {/* <li
                className="text-center"
                onClick={() => navigate("/user-profile")}
              >
                Profile
              </li> */}
              <li className="text-center text-red" onClick={handleLogout}>
                {isAuthenticated ? "Logout" : "Login"}
              </li>
            </ul>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HeadLessDropDown;
