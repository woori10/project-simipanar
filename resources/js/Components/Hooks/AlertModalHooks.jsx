import { useState } from "react";

export default function AlertModalHooks() {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const showAlert = (message, type = "error") => {
    setAlert({ show: true, message, type });

    setTimeout(() => {
      setAlert({ show: false, message: "", type });
    }, 2500);
  };

  return { alert, showAlert };
}
