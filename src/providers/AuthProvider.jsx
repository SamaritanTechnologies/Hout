import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  getProductCategories,
  getProductStaticValuesByName,
} from "../redux/actions/productActions";
import { loginUser, logoutUser, setProductCategories } from "../redux";
import { getAccessToken, setAccessToken, setRefreshToken } from "../providers";
import {
  getAccessFromRefresh,
  getProfileInfo,
} from "../redux/actions/profileActions";
import PageLoader from "../components/Common/PageLoader";

const publicPaths = [
  "/",
  "/cart",
  "/wishlist",
  "/shop-page",
  "/product-detail/:product_id",
  "/customized-product",
 
  "/faq",
  "/about",
  "/terms-conditions",
  "/privacy-policy",
  "/forget-password",
  "/reset-password",
];

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [loading, setLoading] = useState(true);

  const isPublicRoute = publicPaths.some((path) => location.pathname === path);

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
  }, []);

  const handleLogoutUser = async (redirect = true) => {
    dispatch(logoutUser());

    if (redirect && !isPublicRoute) {
      navigate("/");
    }
    setLoading(false);
    setAccessToken("");
    setRefreshToken("");
  };

  // Helper function to dispatch Redux action for user info
  const setUserInfoAction = (userInfo) => {
    dispatch(loginUser(userInfo));
    setLoading(false);
  };

  const getUserData = async () => {
    try {
      const response = await getProfileInfo();
      setUserInfoAction(response);
    } catch (error) {
      console.warn("Get Profile Info Api Error", error);
      handleLogoutUser();
    }
  };

  const generateAccessToken = async () => {
    try {
      const response = await getAccessFromRefresh();
      setAccessToken(response?.access_token);
      setRefreshToken(response?.refresh_token);
      setTimeout(() => {
        getUserData();
      }, 500);
    } catch (error) {
      console.log("error", error);
      handleLogoutUser();
    }
  };

  const fetchData = () => {
    if (pathname === "/forget-password" || pathname === "/reset-password") {
      handleLogoutUser(false);
      return;
    }

    const accessToken = getAccessToken();
    try {
      const decodedToken = jwtDecode(accessToken);

      const expiry = decodedToken.exp;
      const expiryDate = new Date(expiry * 1000);
      const now = new Date();
      // const oneDayFromNow = new Date(now.getTime() + 86400000);
      const fiveHoursFromNow = new Date(now.getTime() + 5 * 60 * 60 * 1000);

      if (expiryDate > fiveHoursFromNow) {
        // Token is still valid for more than 5 hours!
        getUserData();
      } else {
        // Token has expired.
        generateAccessToken();
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      handleLogoutUser();
    }
  };

  useEffect(() => {
    fetchData();

    if (isPublicRoute) {
      setLoading(false);
    }
  }, []);

  return <React.Fragment>{loading ? <PageLoader /> : children}</React.Fragment>;
}
