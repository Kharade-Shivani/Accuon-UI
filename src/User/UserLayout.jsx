import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";
import WhatsAppIcon from "./WhatsAppIcon";
import GlobalEnquiryIcon from "./GlobalEnquiryIcon";

const UserLayout = () => {
  return (
    <>
      <Header />

      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      <Footer />
       <ScrollTop/>
        <WhatsAppIcon/>
        <GlobalEnquiryIcon/>
    </>
  );
};

export default UserLayout;