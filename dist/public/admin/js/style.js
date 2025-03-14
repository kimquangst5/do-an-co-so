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


const questionYesNo = (icon = "success", title, text, confirmButtonText, confirmButtonColor, cancelButtonText, cancelButtonColor, onConfirm ) => {
  Swal.fire({
    showCancelButton: true,
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: confirmButtonColor,
    cancelButtonText: cancelButtonText,
    cancelButtonColor: cancelButtonColor,
  }).then((result) => {
    if (result.isConfirmed && typeof onConfirm === 'function') {
      onConfirm();
    }
  });
}

const closeLoader = () => {
  const loader = document.querySelector("[wait-load]");
  loader.classList.add("hidden");
};
// const drawer = document.querySelector('.drawer-scrolling');
// const openButton = document.querySelector('[open-sider]');
// const closeButton = drawer.querySelector('sl-button[variant="primary"]');

// openButton.addEventListener('click', () => drawer.show());
// closeButton.addEventListener('click', () => drawer.hide());

const openSider = () => {
  const sider = document.querySelector("[sider]");
  if (!sider) return;
  const listUl = sider.querySelectorAll("ul");
  if (listUl.length == 0) return;
  listUl.forEach((ul) => {
    const listLi = ul.querySelectorAll("li");
    listLi.forEach((li) => {
      const link = li.querySelector("a");
      const path = link.getAttribute("href");
      if (location.pathname == path) {
        link.classList.add("active");
        const icon = link.querySelector("sl-icon");
        icon.classList.add("text-[#5277FF]");
        if (ul.parentElement.tagName == "DETAILS") {
          ul.parentElement.open = true;
          const sumary = ul.parentElement.querySelector("summary");
          sumary.classList.add("text-[white]");
        }
      }
    });
  });
};

openSider();
