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

const formSearch = () => {
  const form = document.querySelector("[form-search]");
  if (!form) return;
  const link = form.getAttribute("form-search");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showLoader();
    location.href = `${link}/trang?tu-khoa=${event.target.name.value}`;
  });

  const input = form.querySelector("input");
  input.addEventListener("keydown", () => {
    // console.log(input.value);
    if (input.value.length > 2) {
      axios.get(`${link}/goi-y?tu-khoa=${input.value}`).then((res) => {
        if (res.status == 200) {
          console.log(res.data.products);
          if (res.data.products.length > 0) {
            let htmlResult = "";
            res.data.products.forEach((it) => {
              htmlResult += `<div class='grid grid-cols-12 gap-x-[15px]'><div class='col-span-2 h-auto'><img class='w-full h-auto rounded-[10px]' src='' alt=''></div><div class='col-span-10 grid grid-rows-3'><sl-tooltip class='flex items-center' content=${it.name}><div class='font-bold line-clamp-1'>${it.name}</div></sl-tooltip><div class='flex items-center gap-x-[15px]'><sl-rating precision='0.5' value='5' readonly=''></sl-rating><div class='text-[12px] sm:text-[10px] text-gray-500'>4.5/5</div></div><div class='flex items-center gap-x-[20px]'> <sl-format-number class='text-[20px] sm:text-[18px] font-[500] text-[#000000]' value=${it.priceNew} type='currency' currency='VND' lang='vi-VI'></sl-format-number><sl-format-number class='text-[14px] sm:text-[18px] font-[500] text-[#00000066] line-through flex items-center' value='10000' type='currency' currency='VND' lang='vi-VI'></sl-format-number><div class='w-[50px] h-[24px] text-[#FF3333] text-[10px] font-[500] bg-[#FF33331A] rounded-[50px] flex items-center justify-center'>-10%</div></div></div></div>`;
            });
            let addHTML =
              `<div class="absolute top-[60px] left-[30px] bg-[white] rounded-[20px] w-full flex flex-col -gap-y-[10px] z-[99]"><div class="font-bold text-[20px] py-[10px]"> Kết quả tìm kiếm</div><div class="flex flex-col gap-y-[15px] p-[10px] max-h-[70vh] overflow-y-auto">` +
              htmlResult +
              `</div></div>`;
            const div = document.createElement("div");
            div.innerHTML = addHTML;
            form.appendChild(div);
          }
        }
      });
    }
  });
};
formSearch();

const blockDevTool = () => {
  document.onkeydown = function (e) {
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey &&
        e.shiftKey &&
        ["I", "J", "C", "E"].includes(String.fromCharCode(e.keyCode))) ||
      (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) || // Ctrl+U
      (e.ctrlKey && e.keyCode === "S".charCodeAt(0)) // Ctrl+S
    ) {
      e.preventDefault();
      return false;
    }
  };

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
};
// blockDevTool();
