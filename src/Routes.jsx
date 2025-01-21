import React from "react";
import { Routes as AppRoutes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserRoutes from "./components/Auth/IsAuthenticated";
import AddressCard from "./components/Address/AddressCard";
import OrderHistory from "./components/Address/OrderHistory";
import Wishlist from "./components/Address/Wishlist";

import {
  About,
  Landingpage,
  Dashboard,
  Inbox,
  OrderList,
  Products,
  Signup,
  Signin,
  ShopPage,
  CustomWoodPage,
  AddToCart,
  UserProfile,
  CustomizedProduct,
  AddNewProduct,
  MyAccount,
  UpdateProduct,
  ProductOptions,
  HomepageImage,
  HomepageProducts,
  OurValues,
  OurAssortment,
  WhyHoutTotaal,
  TermsAndConditions,
  AdminPrivacyPolicy,
  AdminFAQ,

} from "./pages";

import { TermsConditions } from "./pages/TermsConditions";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Faq } from "./pages/Faq";
import { ResetPassword } from "./pages/ResetPassword";
import AdminRoutes from "./components/Auth/AdminRoutes";
import AuthRedirect from "./components/Auth/AuthRedirect";

function Routes() {
  return (
    <AppRoutes>
      <Route element={<Layout />}>
        <Route element={<UserRoutes />}>
          <Route path="/" element={<Landingpage />} />
          <Route path="/shop-page" element={<ShopPage />} />

          <Route path="/wood-page" element={<CustomWoodPage />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/customized-product" element={<CustomizedProduct />} />

          <Route path="/about" element={<About />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/products/" element={<Products />} />
          <Route path="/product-options/" element={<ProductOptions />} />
          <Route path="/homepage-image/" element={<HomepageImage />} />
          <Route path="/homepage-products/" element={<HomepageProducts />} />
          <Route path="/our-values/" element={<OurValues />} />
          <Route path="/our-assortment/" element={<OurAssortment />} />
          <Route path="/why-hout-totaal/" element={<WhyHoutTotaal />} />
          <Route path="/terms-and-conditions/" element={<TermsAndConditions />} />
          <Route path="/admin-privacy-policy/" element={<AdminPrivacyPolicy />} />
          <Route path="/admin-FAQ/" element={<AdminFAQ />} />
          <Route path="/product/:id" element={<UpdateProduct />} />
          <Route path="/new-product" element={<AddNewProduct />} />
          <Route path="/order-list/" element={<OrderList />} />
          {/* <Route path="/user-profile" element={<UserProfile />} /> */}
        </Route>

        <Route element={<AuthRedirect />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </AppRoutes>
  );
}

export default Routes;
