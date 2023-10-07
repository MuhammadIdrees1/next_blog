import { toast } from "react-toastify";

export const showToastMessage = (toastType, message) => {
  if (toastType === "error") {
    toast.error(`${message}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  } else {
    toast.success(`${message}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};
