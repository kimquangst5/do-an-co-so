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

const closeLoader = () => {
     const loader = document.querySelector("[wait-load]");
     loader.classList.add("hidden");
};

// Get the button
const mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button

const scrollFunction = () => {
     if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
     ) {
          mybutton.classList.remove("hidden");
     } else {
          mybutton.classList.add("hidden");
     }
};
const backToTop = () => {
     window.scrollTo({
          top: 0,
          behavior: "smooth"
     });
};

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

window.addEventListener("scroll", scrollFunction);