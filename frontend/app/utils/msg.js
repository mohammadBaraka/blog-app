import toast from "react-hot-toast";
import swal from "sweetalert";

export const notify = (msg) => toast(msg);
export const msgSuccess = (msg) => toast.success(msg);
export const msgError = (msg) => toast.error(msg);
export const msgConfirm = (msg, icon, func) => {
  swal({
    title: `Are you sure?`,
    text: msg,
    icon: icon,
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      func();
    }
  });
};
