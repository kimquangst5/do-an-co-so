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
const setCookie = (name, value, days) => {
  const expires = days
    ? `expires=${new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
      ).toUTCString()};`
    : "";
  document.cookie = `${name}=${value}; ${expires}`;
};
const getCookie = (cookieName) => {
  // Tách chuỗi thành một mảng các cặp name/value
  let cookieArray = document.cookie.split("; ");
  // Chuyển name/value từ dạng string thành object
  cookieArray = cookieArray.map((item) => {
    item = item.split("=");
    return {
      name: item[0],
      value: item[1],
    };
  });
  // Lấy ra cookie đang cần tìm
  const cookie = cookieArray.find((item) => {
    return item.name === cookieName;
  });

  return cookie ? decodeURIComponent(cookie.value) : null;
};
const deleteCookie = (cookieName) => {
  document.cookie = `cookieName=; expires=Thu, 08 Aug 2005 00:00:00 UTC`;
};
const showAlertSuccessCookie = () => {
  const data = getCookie("alert-success");
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
      icon: "success",
      title: decodeURIComponent(data),
    });
    setCookie("alert-success", "xoa-cookie");
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
  showAlertSuccessCookie();
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
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.classList.remove("hidden");
  } else {
    mybutton.classList.add("hidden");
  }
};
const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

window.addEventListener("scroll", scrollFunction);
