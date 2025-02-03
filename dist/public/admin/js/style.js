const showAlertSuccess = () => {
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
};

const showAlertError = () => {
     const error = JSON.parse(localStorage.getItem("alert-error"));
     if (error) {
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
               icon: error.icon,
               title: error.title,
          });
          localStorage.removeItem("alert-error");
     }
};

window.addEventListener("load", (event) => {
     showAlertSuccess();
     showAlertError();
});

const showLoader = () => {
     const loader = document.querySelector("[wait-load]");
     loader.classList.remove("hidden");
};