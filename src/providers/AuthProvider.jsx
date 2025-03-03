import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  getProductCategories,
  getProductStaticValuesByName,
} from "../redux/actions/productActions";
import { setProductCategories } from "../redux";
// import { loginUser, setUserInfoError, logoutUser } from "../redux";
import {
  axiosWithCredentials,
  getAccessToken,
  setAccessToken,
} from "../providers";
// import { Loader2, publicRoutes, authenticationRoutes } from "../components";

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  // const isPrivateRoute =
  //   location.pathname !== "/" && !publicRoutes.includes(location.pathname);

  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      // fetch dynamic categories
      const dynamicCategories = await getProductCategories();

      // fetch unqiue values for thickness, width, and weight from all products list
      const staticValuesPromises = [
        getProductStaticValuesByName("thickness"),
        getProductStaticValuesByName("width"),
        // getProductStaticValuesByName("weight"),
      ];
      // backend not sending weight unique values :) need to add from backend
      const [thicknessRes, widthRes, weightRes] = await Promise.all(
        staticValuesPromises
      );

      // transform unqiue values into the same format as categories
      const transformUniqiueValues = (name, values) => ({
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
        transformUniqiueValues("thickness", thicknessRes.values),
        transformUniqiueValues("width", widthRes.values),
        // transformUniqiueValues("weight", weightRes.values),
      ];


      // combine dynamic and unique static categories
      const combinedCategories = [...dynamicCategories, ...uniqueCategories];
      dispatch(setProductCategories(combinedCategories));
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(setProductCategories([]));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  // const handleLogoutUser = async () => {
  //   setAccessToken("");
  //   dispatch(logoutUser());
  //   setLoading(false);

  //   if (isPrivateRoute && !authenticationRoutes.includes(location.pathname)) {
  //     navigate("/sign-in");
  //   }
  // };

  // Helper function to dispatch Redux action for user info
  // const setUserInfoAction = (userInfo) => {
  //   dispatch(loginUser(userInfo));
  //   dispatch(setUserInfoError(false));
  //   setLoading(false);
  // };

  // const getInfo = async (id) => {
  //   try {
  //     const response = await axiosWithCredentials.get(`/Users/${id}`);
  //     setUserInfoAction(response.data);
  //   } catch (error) {
  //     handleLogoutUser();
  //   }
  // };

  // useEffect(() => {
  //   // Api call for get setup details
  //   // getSetup(dispatch);

  //   const accessToken = getAccessToken();
  //   try {
  //     const decodedToken = jwtDecode(accessToken);
  //     const expiry = decodedToken.exp;
  //     const expiryDate = new Date(expiry * 1000);
  //     const now = new Date();

  //     const userId = decodedToken
  //       ? decodedToken[
  //           "http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid"
  //         ]
  //       : null;

  //     if (expiry && expiryDate >= now && userId) {
  //       // getInfo(userId);
  //     } else {
  //       handleLogoutUser();
  //     }
  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //     handleLogoutUser();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!isPrivateRoute) {
  //     setLoading(false);
  //   }
  // }, [location]);

  return (
    <React.Fragment>
      {/* {isPrivateRoute && loading ? <Loader2 /> : children} */}
      {children}
    </React.Fragment>
  );
}
