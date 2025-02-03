const alert = () => {
  window.addEventListener("load", (event) => {
    const data = JSON.parse(localStorage.getItem("alert-success"));
    if (data) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: data.icon,
        title: data.title,
      });
      localStorage.removeItem("alert-success");
    }
  });
};

export { alert };
