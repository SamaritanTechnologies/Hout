// import React, { useEffect, useState } from "react";
// import profileImg from "../../assets/myAccount/profile.png";
// import invoiceImg from "../../assets/myAccount/invoiceimg.svg";
// import profilebtn from "../../assets/myAccount/profileBtn.svg";
// import { getInvoice, getOrderDetails } from "../../redux/actions/orderActions";
// import moment from "moment";
// import { axiosWithCredentials } from "../../providers";

// const OrderHistory = () => {
//   const [state, setState] = useState({
//     orderList: [],
//     invoice: null,
//     // loading: false,
//     // selectedItem: null,
//     loadingItems: {},
//   });

//   const fetchOrderslist = async () => {
//     try {
//       const res = await axiosWithCredentials.get("/order/");
//       setState((prev) => ({
//         ...prev,
//         orderList: res.data,
//       }));
//       console.log("order", res.data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOrderslist();
//   }, []);

//   const downloadInvoice = async (id) => {
//     setState((prev) => ({
//       ...prev,
//       loadingItems: {
//         ...prev.loadingItems,
//         [id]: true,
//       },
//     }));
//     try {
//       // Fetch the invoice data with response type as 'arraybuffer'
//       const res = await getInvoice(id);

//       // Create a Blob from the response data with the correct MIME type
//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `invoice_${id}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();

//       // Optionally, you can revoke the object URL to release memory
//       window.URL.revokeObjectURL(url);
//       setState((prev) => ({
//         ...prev,
//         loading: false,
//       }));
//     } catch (error) {
//       setState((prev) => ({
//         ...prev,
//         loading: false,
//       }));
//       toast.error("Something went wrong");
//       console.error("Error fetching invoice data:", error);
//     } finally {
//       setState((prev) => ({
//         ...prev,
//         loadingItems: {
//           ...prev.loadingItems,
//           [id]: false,
//         },
//       }));
//     }
//   };

//   return (
//     <section className="px-8 xs:px-8 sm:px-10 md:px-10 lg:px-12 my-20 xs:my-8 sm:my-10 md:my-13 lg:my-14">
//       {/* <h1 className="text-[48px] xs:text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] text-center text-[#000000] mb-[80px] xs:mb-[25px] sm:mb-[30px] md:mb-[50px] lg:mb-[70px]">
//         My Account
//       </h1> */}
//       <div className="flex xs:flex-col xs:items-center sm:flex-col sm:items-center mb-32 justify-center">
//         <div className="w-[100%]">
//           <h1 className="text-20 font-semibold mb-[18px] sm:mt-12 sm:text-center xs:mt-10 xs:text-center">
//             Orders History
//           </h1>
//           <div className="xs:overflow-auto">
//             <table className="w-[100%] ">
//               <thead>
//                 <tr className=" border-solid border-b-[1px] border-[#E8ECEF] flex w-[100%] xs:w-[541px] justify-between py-[22px]">
//                   <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
//                     Number ID
//                   </th>
//                   <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
//                     Dates
//                   </th>
//                   <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
//                     Status
//                   </th>
//                   <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
//                     Price
//                   </th>
//                   <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
//                     Invoice
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {state?.orderList?.length > 0 ? (
//                   state.orderList.map((item) => (
//                     <tr
//                       key={item.id}
//                       className="border-solid border-b-[1px] border-[#E8ECEF] flex w-[100%] xs:w-[541px] justify-between py-[22px]"
//                     >
//                       <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
//                         {item?.id}
//                       </td>
//                       <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
//                         {moment(item?.dates).format("MMMM DD, YYYY")}
//                       </td>
//                       <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
//                         {item?.status}
//                       </td>
//                       <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
//                         €{item?.gross_total}
//                       </td>
//                       <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
//                         <button
//                           onClick={() => downloadInvoice(item?.invoice_id)}
//                         >
//                           {state.loadingItems[item?.invoice_id] ? (
//                             <p className="text-green1">Downloading...</p>
//                           ) : (
//                             <span>
//                               <img src={invoiceImg} alt="Invoice" />
//                             </span>
//                           )}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="text-[14px] text-[#141718] text-center py-[22px]"
//                     >
//                       No order history
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OrderHistory;

import React, { useEffect, useState } from "react";
import invoiceImg from "../../assets/myAccount/invoiceimg.svg";
import { getInvoice } from "../../redux/actions/orderActions";
import moment from "moment";
import { axiosWithCredentials } from "../../providers";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const [loadingItems, setLoadingItems] = useState({}); // Separate state for loading items

  const fetchOrderslist = async () => {
    try {
      const res = await axiosWithCredentials.get("/order/");
      setOrderList(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchOrderslist();
  }, []);

  const downloadInvoice = async (id) => {
    // Set loading state only for this specific ID
    setLoadingItems((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await getInvoice(id);
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error fetching invoice data:", error);
    } finally {
      // Reset loading state only for this specific ID
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <section className="px-8 xs:px-8 sm:px-10 md:px-10 lg:px-12 my-20 xs:my-8 sm:my-10 md:my-13 lg:my-14">
      <div className="flex xs:flex-col xs:items-center sm:flex-col sm:items-center mb-32 justify-center">
        <div className="w-[100%]">
          <h1 className="text-20 font-semibold mb-[18px] sm:mt-12 sm:text-center xs:mt-10 xs:text-center">
            Orders History
          </h1>
          <div className="xs:overflow-auto">
            <table className="w-[100%]">
              <thead>
                <tr className="border-solid border-b-[1px] border-[#E8ECEF] flex w-[100%] xs:w-[541px] justify-between py-[22px]">
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
                  {/* <th className="text-[14px] text-[#6C7275] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                    Invoice
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {orderList?.length > 0 ? (
                  orderList.map((item) => (
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
                      <td
                        className={`text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left px-2 py-1 rounded `}
                      >
                        <span
                          className={`p-2 rounded-full ${
                            {
                              pending: "bg-[#FCBE2D] text-white",
                              delivered: "bg-green1 text-white",
                            }[item?.status?.toLowerCase()] ||
                            "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {item?.status}
                        </span>
                      </td>
                      <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                        {(() => {
                          const amount = parseFloat(item?.gross_total);
                          return isNaN(amount)
                            ? "€0.00"
                            : `€${amount.toFixed(2)}`;
                        })()}
                      </td>
                      {/* <td className="text-[14px] text-[#141718] w-[20%] md:w-[auto] sm:w-[auto] text-left">
                        <button
                          onClick={() => downloadInvoice(item?.invoice_id)}
                          disabled={loadingItems[item?.invoice_id]}
                        >
                          {loadingItems[item?.invoice_id] ? (
                            <p className="text-green1">Downloading...</p>
                          ) : (
                            <img src={invoiceImg} alt="Invoice" />
                          )}
                        </button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-[14px] text-[#141718] text-center py-[22px]"
                    >
                      No order history
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
