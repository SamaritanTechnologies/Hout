import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  getProductCategories,
  getProductStaticValuesByName,
} from "../redux/actions/productActions";
import { setProductCategories } from "../redux";
import {
  axiosWithCredentials,
  getAccessToken,
  setAccessToken,
} from "../providers";
import { Circles } from "react-loader-spinner";
// import { Loader2 } from "../components";

const authPaths = [
  "/sign-in",
  "/sign-up",
  "/forget-password",
  "/reset-password",
];
const protectedPaths = [
  "/dashboard",
  "/vat-value",
  "/products",
  "/new-product",
  "/product-options",
  "/homepage-image",
  "/homepage-products",
  "/our-values",
  "/our-assortment",
  "/why-hout-totaal",
  "/terms-and-conditions",
  "/admin-privacy-policy",
  "/admin-about-us",
  "/admin-FAQ",
  // "/inbox",
  "/order-list",
  "/product",
  "/user-profile",
  "/customized-product",
  "/",
  "/shop-page",
  "/porduct-detail/:product_id",
  "/cart",
  "/customized-product",
  "/about",
  "/myaccount",
  "/wishlist",
];

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const dynamicCategories = await getProductCategories();
        const staticValuesPromises = [
          getProductStaticValuesByName("thickness"),
          getProductStaticValuesByName("width"),
        ];

        const [thicknessRes, widthRes] = await Promise.all(
          staticValuesPromises
        );

        const transformUniqueValues = (name, values) => ({
          id: Math.floor(Math.random() * 1000),
          name,
          choices: values?.map((value) => ({
            id: Number(value),
            category: name,
            name_en: value,
            name_nl: value,
          })),
        });

        const uniqueCategories = [
          transformUniqueValues("thickness", thicknessRes.values),
          transformUniqueValues("width", widthRes.values),
        ];

        const combinedCategories = [...dynamicCategories, ...uniqueCategories];
        dispatch(setProductCategories(combinedCategories));
      } catch (error) {
        console.error("Error fetching categories:", error);
        dispatch(setProductCategories([]));
      }
    };

    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    const checkAuth = async () => {
      const currentPath = location.pathname;
      const isAdminRoute = protectedPaths.some((path) =>
        currentPath.startsWith(path)
      );
      const isAuthRoute = authPaths.includes(currentPath);

      if (isAdminRoute) {
        setLoading(true);
        try {
          const accessToken = getAccessToken();
          const refreshToken = localStorage.getItem("refresh_token");
          const expiry = localStorage.getItem("access_expires_at");

          let tokenValid = false;
          let shouldRefresh = false;

          if (accessToken && expiry) {
            const expiryTime = parseInt(expiry, 10);
            const currentTime = Date.now();
            const remainingTime = expiryTime - currentTime;
            tokenValid = remainingTime > 0;
            shouldRefresh = remainingTime <= 5 * 60 * 1000;
          } else if (refreshToken) {
            shouldRefresh = true;
          }

          if (shouldRefresh && refreshToken) {
            const response = await axiosWithCredentials.post(
              "/accounts/refresh_token/",
              {
                refresh_token: refreshToken,
              }
            );

            const newAccessToken = response.data.access_token;
            console.log("newAccessToken", response.data);
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            localStorage.setItem(
              "access_expires_at",
              response.data.access_expires_at
            );
            setAccessToken(newAccessToken);
          } else if (!tokenValid) {
            localStorage.clear();
            throw new Error("No valid token");
          }

          const decoded = jwtDecode(getAccessToken());
          setLoading(false);
        } catch (error) {
          setAccessToken("");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("access_expires_at");
          navigate("/sign-in");
          setLoading(false);
        }
      } else if (isAuthRoute) {
        const accessToken = getAccessToken();
        const expiry = localStorage.getItem("access_expires_at");

        if (accessToken && expiry && Date.now() < parseInt(expiry, 10)) {
          navigate("/");
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location, navigate]);

  const isAdminRoute = protectedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <React.Fragment>
      {isAdminRoute && loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <Circles
            height="80"
            width="80"
            color="#FFDD00"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        children
      )}
    </React.Fragment>
  );
}
