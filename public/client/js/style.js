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
  const expires = days ?
    `expires=${new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
      ).toUTCString()};` :
    "";
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

  function resetForm() {
    while (form.children.length > 2) {
      form.removeChild(form.lastChild);
    }
  }

  function clearSuggestions() {
    const suggestions = form.querySelector(".suggestions");
    if (suggestions) {
      suggestions.remove();
    }
  }

  const input = form.querySelector("input");
  let timeout;
  // input.addEventListener("blur", () => {
  //   resetForm();
  // });
  input.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // Nếu có giá trị tìm kiếm (sau khi loại bỏ khoảng trắng thừa)
      if (input.value.trim().length > 0) {
        axios
          .get(`${link}/goi-y?tu-khoa=${input.value.trim()}`)
          .then((res) => {
            clearSuggestions(); // Xóa kết quả cũ nếu có
            if (
              res.status === 200 &&
              res.data.products &&
              res.data.products.length > 0
            ) {
              // Tạo container cho gợi ý tìm kiếm
              const suggestions = document.createElement("div");
              suggestions.classList.add(
                "suggestions",
                ...`absolute top-[60px] left-[30px] bg-[white] rounded-[20px] w-full flex flex-col -gap-y-[10px] z-[99]`.split(
                  " "
                )
              );
              let htmlDiv = `
                <div class="font-bold text-[20px] py-[10px]">Kết quả tìm kiếm</div>
                <div class="flex flex-col gap-y-[15px] p-[10px] h-[70vh] overflow-y-auto">`;
              res.data.products.forEach((sp) => {
                htmlDiv += `
                  <div class="grid grid-cols-12 gap-x-[15px]">
                    <a href=${sp.link} class="col-span-2 h-auto">
                      <img class="w-full h-auto rounded-[10px]" src="${sp.img_main[0]}" alt="" />
                    </a>
                    <div class="col-span-10 grid grid-rows-3">
                      <sl-tooltip class="flex items-center" content="${sp.name}">
                        <a href=${sp.link} class="font-bold line-clamp-1">${sp.name}</a>
                      </sl-tooltip>
                      <div class="flex items-center gap-x-[15px]">
                        <sl-rating precision="0.5" value="4.5" readonly="readonly"></sl-rating>
                        <div class="text-[12px] sm:text-[10px] text-gray-500">4.5/5</div>
                      </div>
                      <div class="flex items-center gap-x-[20px]">
                        <sl-format-number class="text-[20px] sm:text-[18px] font-[500] text-[#000000]" value="${sp.priceNew}" type="currency" currency="VND" lang="vi-VI"></sl-format-number>`;
                if (sp.discount !== 0) {
                  htmlDiv += `
                        <sl-format-number class="text-[14px] sm:text-[18px] font-[500] text-[#00000066] line-through flex items-center" value="${sp.price}" type="currency" currency="VND" lang="vi-VI"></sl-format-number>
                        <div class="w-[50px] h-[24px] text-[#FF3333] text-[10px] font-[500] bg-[#FF33331A] rounded-[50px] flex items-center justify-center">-${sp.discount}%</div>`;
                }
                htmlDiv += `
                      </div>
                    </div>
                  </div>`;
              });
              htmlDiv += `</div>`;
              suggestions.innerHTML = htmlDiv;
              form.appendChild(suggestions);
            } else {
              clearSuggestions();
            }
          })
          .catch((error) => {
            clearSuggestions();
          });
      } else {
        clearSuggestions();
      }
    }, 500);
  });
  // input.addEventListener("blur", () => {
  //   clearSuggestions();
  // });
};
formSearch();

const blockDevTool = () => {
  document.onkeydown = function (e) {
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey &&
        e.shiftKey && ["I", "J", "C", "E"].includes(String.fromCharCode(e.keyCode))) ||
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
window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    closeLoader();
  }
});

const animation = () => {
  // const container = document.querySelector('.animation-scroll');
  const animation = document.querySelectorAll('sl-animation');
  if (!animation || animation.length == 0) return
  animation.forEach(it => {
    const box = it.querySelector('.box');

    // Watch for the box to enter and exit the viewport. Note that we're observing the box, not the animation element!
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Start the animation when the box enters the viewport
        it.play = true;
      } else {
        it.play = false;
        it.currentTime = 0;
      }
    });
    // if(box)
    observer.observe(it.children[0]);
  })


}

animation()