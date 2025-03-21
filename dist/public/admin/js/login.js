const showLoader = () => {
  const loader = document.querySelector("[wait-load]");
  loader.classList.remove("hidden");
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

  return cookie ? cookie.value : null;
};
const main = () => {
  const btnLogin = document.querySelector("[btn-login]");
  if (!btnLogin) return;
  btnLogin.addEventListener("click", () => {
    showLoader();
    const info = document.querySelector("[name='info']");
    const password = document.querySelector("[name='password']");
    const link = btnLogin.getAttribute("btn-login");
    console.log(info);
    console.log(password);
    console.log(link);

    if (info && password && link) {
      axios
        .post(link, {
          info: info.value,
          password: password.value,
        })
        .then((res) => {
          if (res.status == 200 && res.data.code == 200) {
            const redirect = btnLogin.getAttribute("redirect");

            if (redirect) location.href = redirect;
          } else if (res.status == 200 && res.data.code == 400) {
            location.reload();
          } else if (res.status == 400) {
            location.reload();
          } else if (res.status == 504) {
            location.reload();
          }
        })
        .catch(error => {
          // location.reload()
          console.log(error);

        })
    }
  });

  const closeSession = getCookie("closeSession");
  if (closeSession) {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "Hết phiên đăng nhật",
      text: "Vui lòng đăng nhập lại!",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

main();