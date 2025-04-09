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
} from "./pages";

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

function Routes() {
  return (
    <AppRoutes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/myaccount" element={<MyAccount />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vat-value" element={<VatValue />} />
          <Route path="/products" element={<Products />} />
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
          {/* <Route path="/order-list" element={<OrderList />} /> */}
          {/* <Route path="/user-profile" element={<UserProfile />} /> */}
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        <Route path="/oauth-callback" element={<OAuthCallback />} />
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
