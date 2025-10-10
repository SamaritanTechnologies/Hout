import React from "react";
import { Routes as AppRoutes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
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
  ProductDetail,
  AddToCart,
  UserProfile,
  CustomizedProduct,
  AddNewProduct,
  MyAccount,
  UpdateProduct,
  ProductOptions,
  HomePageImage,
  HomePageProducts,
  OurValues,
  OurAssortment,
  WhyHoutTotaal,
  TermsAndConditions,
  AdminPrivacyPolicy,
  AdminFAQ,
  AdminAboutUs,
  VatValue,
  Orders,
} from "./pages";
import AdminWehshop from "./pages/AdminWehshop";
import { TermsConditions } from "./pages/TermsConditions";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Faq } from "./pages/Faq";
import { ResetPassword } from "./pages/ResetPassword";
import {
  AdminRoute,
  PrivateRoute,
  ProtectedRoute,
} from "./providers/PrivateRoutes";
import { OAuthCallback } from "./pages/OAuthCallback ";
import AddCoupon from "./pages/AddCoupon";
import DeliveryValue from "./pages/DeliveryValue";
import AdminSignIn from "./pages/AdminSignIn";
import AdminSignUp from "./pages/AdminSignUp";
import AdminForgot from "./pages/AdminForgot";
import AdminReset from "./pages/AdminReset";
import PaymentOptions from "./pages/PaymentOptions";

function Routes() {
  return (
    <AppRoutes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/myaccount" element={<MyAccount />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-coupon" element={<AddCoupon />} />
          {/* <Route path="/vat-value" element={<VatValue />} /> */}
          <Route path="/delivery" element={<DeliveryValue />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product-options" element={<ProductOptions />} />
          <Route path="/homepage-image" element={<HomePageImage />} />
          <Route path="/homepage-products" element={<HomePageProducts />} />
          <Route path="/our-values" element={<OurValues />} />
          <Route path="/our-assortment" element={<OurAssortment />} />
          <Route path="/why-hout-totaal" element={<WhyHoutTotaal />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route
            path="/admin-privacy-policy"
            element={<AdminPrivacyPolicy />}
          />
          <Route path="/admin-about-us" element={<AdminAboutUs />} />
          <Route path="/admin-FAQ" element={<AdminFAQ />} />
          <Route path="/product/:id" element={<UpdateProduct />} />
          <Route path="/new-product" element={<AddNewProduct />} />
          <Route path="/admin-webshop" element={<AdminWehshop />} />
          <Route path="/admin-signin" element={<AdminSignIn />} />
          <Route path="/admin-signup" element={<AdminSignUp />} />
          <Route path="/admin-forgot" element={<AdminForgot />} />
          <Route path="/admin-reset" element={<AdminReset />} />
          <Route path="/admin-payment" element={<PaymentOptions />} />
          {/* <Route path="/order-list" element={<OrderList />} /> */}
          {/* <Route path="/user-profile" element={<UserProfile />} /> */}
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/oauth-callback" element={<OAuthCallback />} />
        </Route>

        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Landingpage />} />
        <Route path="/cart" element={<AddToCart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shop-page" element={<ShopPage />} />
        <Route path="/product-detail/:product_id" element={<ProductDetail />} />
        <Route path="/customized-product" element={<CustomizedProduct />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </AppRoutes>
  );
}

export default Routes;
