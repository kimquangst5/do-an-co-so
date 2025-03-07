const btnOtp = () => {
  const btn = document.querySelector("[btn-otp]");
  if (!btn) return;
  btn.addEventListener("click", () => {
    console.log("ok");
    const link = btn.getAttribute("btn-otp");
    if (!link) return;
    console.log(link);
    showLoader();
    axios
      .post(link, {})
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem(
            "alert-success",
            JSON.stringify({
              title: "Gửi mã thành công!\nVui lòng kiểm tra Email",
              icon: "success",
            })
          );
          closeLoader();
          showAlertSuccess();
        }
      })
      .catch((error) => {
        console.log(error.response.data.time);
        const expirationTime = new Date(error.response.data.time);
        const currentTime = new Date();
        const diffMs = expirationTime - currentTime;
        const diffMinutes = Math.floor(diffMs / 60000);
        const diffSeconds = Math.floor(diffMs / 1000);
        localStorage.setItem(
          "alert-success",
          JSON.stringify({
            title: `Vui lòng gửi lại mã sau ${
              diffMinutes >= 1
                ? diffMinutes
                : diffSeconds >= 0
                ? diffSeconds
                : "vài"
            } ${diffMinutes >= 1 ? "phút" : "giây"} nữa`,
            icon: "error",
          })
        );
        closeLoader();
        showAlertSuccess();
      });
  });
};

btnOtp();

const main = () => {
  const codeOtp = document.querySelector("[code-otp]");
  const newEmail = document.querySelector("[new-email]");
  const btnUpdate = document.querySelector("[btn-update]");
  const link = btnUpdate.getAttribute("btn-update");
  if (!link || !btnUpdate || !codeOtp || !newEmail) return;
  btnUpdate.addEventListener("click", () => {
    console.log(btnUpdate);
    console.log(codeOtp.value);
    console.log(newEmail.value);
    showLoader();
    axios
      .post(link, {
        email: newEmail.value,
        otp: codeOtp.value,
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem(
            "alert-success",
            JSON.stringify({
              title: "Cập nhật email thành công!",
              icon: "success",
            })
          );
          location.reload();
        }
      })
      .catch((error) => {
        closeLoader();
        localStorage.setItem(
          "alert-error",
          JSON.stringify({
            title: error.response.data.message,
            icon: "warning",
          })
        );
        showAlertError();
      });
  });
};

main();
