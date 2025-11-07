import React, { useEffect, useState, useCallback } from "react";
import invoiceImg from "../../assets/myAccount/invoiceimg.svg";
import { getInvoice } from "../../redux/actions/orderActions";
import moment from "moment";
import { axiosWithCredentials } from "../../providers";
import { toast } from "react-toastify";
import Pagination from "../../components/Common/Pagination";
import { ORDER_PAGE_SIZE } from "../../utils/const";
import { useTranslation } from "react-i18next";
import { scrollToTop, formatPrice } from "../../utils/helper";

const OrderHistory = () => {
  const { t } = useTranslation();
  const [orderList, setOrderList] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchOrdersList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosWithCredentials.get("/order/", {
        params: { page: currentPage, pageSize: ORDER_PAGE_SIZE },
      });

      setOrderList(res?.data?.results || []);
      setTotalPage(res?.data?.total_pages || 0);
    } catch (error) {
      toast.error("Failed to fetch orders.");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchOrdersList();
  }, [fetchOrdersList]);

  const handlePageChange = useCallback(({ selected }) => {
    setCurrentPage(selected + 1); // Convert to one-based
    scrollToTop();
  }, []);

  const downloadInvoice = async (id) => {
    if (!id) {
      toast.error("There is no invoice related to this order");
      return;
    }

    setLoadingItems((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await getInvoice(id);
      if (!res?.data) {
        toast.error("No invoice data found for this order");
        return;
      }

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
      toast.error("Something went wrong while downloading the invoice.");
      console.error("Invoice download error:", error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  const sortOrdersByDate = (orders) => {
    return [...orders].sort((a, b) => new Date(b?.dates) - new Date(a?.dates));
  };

  const paginatedData = sortOrdersByDate(orderList);

  return (
    <>
      <section className="px-8 xs:px-8 sm:px-10 md:px-10 lg:px-12 my-20 xs:my-8 sm:my-10 md:my-13 lg:my-14">
        <div className="flex flex-col items-center mb-32">
          <div className="w-full overflow-auto">
            <h1 className="text-20 font-semibold mb-[18px] text-center">
              {t("o_orders_history_title")}
            </h1>
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E8ECEF] text-left">
                  <th className="text-sm text-[#6C7275] py-3">
                    {t("o_number_id")}
                  </th>
                  <th className="text-sm text-[#6C7275] py-3">{t("o_date")}</th>
                  <th className="text-sm text-[#6C7275] py-3">
                    {t("o_status")}
                  </th>
                  <th className="text-sm text-[#6C7275] py-3">
                    {t("o_price")}
                  </th>
                  <th className="text-sm text-[#6C7275] py-3">
                    {t("o_invoice")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData?.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#E8ECEF] text-left"
                    >
                      <td className="py-3">{item?.order_id || "-"}</td>
                      <td className="py-3">
                        {item?.dates
                          ? moment(item?.dates).format("MMMM DD, YYYY")
                          : "N/A"}
                      </td>
                      <td className="py-3  flex justify-center items-center ">
                        <p
                          className={`p-2  rounded-full ${
                            {
                              pending: "bg-[#FCBE2D] text-white",
                              rejected: "bg-[#FD5454] text-white",
                              delivered: "bg-[#22C55E] text-white",
                              "order picken": "bg-[#3B82F6] text-white",
                              "delivery planning": "bg-[#8B5CF6] text-white",
                              "ready for pickup": "bg-[#F59E42] text-white",
                              "in transit": "bg-[#14B8A6] text-white",
                            }[
                              item?.status
                                ? item.status.toLowerCase().trim()
                                : ""
                            ] || "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {item?.status || "Unknown"}
                        </p>
                      </td>
                      <td className="py-3">
                        €{formatPrice(item?.total || 0)}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => downloadInvoice(item?.invoice_id)}
                          disabled={loadingItems[item?.invoice_id]}
                        >
                          {loadingItems[item?.invoice_id] ? (
                            <span className="text-green1">Downloading...</span>
                          ) : (
                            <img src={invoiceImg} alt="Invoice" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-[#141718] py-5">
                      {t("o_no_order_history")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {totalPage > 1 && (
        <Pagination
          pageCount={totalPage}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
        />
      )}
    </>
  );
};

export default OrderHistory;
