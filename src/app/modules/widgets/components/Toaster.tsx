import { toast } from "react-toastify";

const showSuccessToastMessage = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const showErrorToastMessage = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export {
    showSuccessToastMessage,
    showErrorToastMessage,
};
  