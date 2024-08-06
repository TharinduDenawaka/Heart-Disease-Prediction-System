import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotificationContainer = () => {
  return (
    // <ToastContainer
    //   position="bottom-right"
    //   autoClose={3000}
    //   hideProgressBar={false}
    //   newestOnTop={false}
    //   closeOnClick
    //   rtl={false}
    //   pauseOnFocusLoss
    //   draggable
    //   pauseOnHover
    // />

    <ToastContainer
      // position="top-right"
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={true}
      // hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      // theme="colored"
    />
  );
};

export default ToastNotificationContainer;
