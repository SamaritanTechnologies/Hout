import React, { useEffect, useState } from "react";
import profileImg from "../../assets/myAccount/profile.png";
import invoiceImg from "../../assets/myAccount/invoiceimg.svg";
import profilebtn from "../../assets/myAccount/profileBtn.svg";
import { getOrderDetails } from "../../redux/actions/orderActions";
import moment from "moment";

const OrderHistory = () => {
  const [state, setState] = useState({
    orderList: [],
  });

  const fetchOrderslist = async () => {
    try {
      const res = await getOrderDetails();
      setState((prev) => ({
        ...prev,
        orderList: res,
      }));
      console.log(res, "fetchUser44334");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log(state?.orderList, "state");

  useEffect(() => {
    fetchOrderslist();
  }, []);

  return (
    <section className="px-8 xs:px-8 sm:px-10 md:px-10 lg:px-12 my-20 xs:my-8 sm:my-10 md:my-13 lg:my-14">
      {/* <h1 className="text-[48px] xs:text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] text-center text-[#000000] mb-[80px] xs:mb-[25px] sm:mb-[30px] md:mb-[50px] lg:mb-[70px]">
        My Account
      </h1> */}
      <div className="flex xs:flex-col xs:items-center sm:flex-col sm:items-center mb-32 justify-center">
        <div className="w-[100%]">
          <h1 className="text-20 font-semibold mb-[18px] sm:mt-12 sm:text-center xs:mt-10 xs:text-center">
            Orders History
          </h1>
          <div className="xs:overflow-auto">
            <table className="w-[100%] ">
              <thead>
                <tr className=" border-solid border-b-[1px] border-[#E8ECEF] flex w-[100%] xs:w-[541px] justify-between py-[22px]">
                  <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                    Number ID
                  </th>
                  <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                    Dates
                  </th>
                  <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                    Status
                  </th>
                  <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                    Price
                  </th>
                  <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody>
                {state?.orderList?.length > 0 ? (
                  state.orderList.map((item) => (
                    <tr
                      key={item.id}
                      className="border-solid border-b-[1px] border-[#E8ECEF] flex w-[100%] xs:w-[541px] justify-between py-[22px]"
                    >
                      <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                        {item?.id}
                      </td>
                      <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                        {moment(item?.dates).format("MMMM DD, YYYY")}
                      </td>
                      <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                        {item?.status}
                      </td>
                      <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                        ${item?.gross_total}
                      </td>
                      <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                        <button>
                          <span>
                            <img src={invoiceImg} alt="Invoice" />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-[14px] text-[#141718] text-center py-[22px]"
                    >
                      No items
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
