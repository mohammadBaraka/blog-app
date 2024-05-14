import toast from "react-hot-toast";
export const notify = (msg) => toast(msg);
export const msgSuccess = (msg) => toast.success(msg);
export const msgError = (msg) => toast.error(msg);
