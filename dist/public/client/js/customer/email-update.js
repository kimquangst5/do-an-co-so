function OTPInput() {
  const inputs = document.querySelectorAll("#otp > *[id]");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keydown", function (event) {
      if (event.key === "Backspace") {
        inputs[i].value = "";
        if (i !== 0) inputs[i - 1].focus();
      } else {
        if (i === inputs.length - 1 && inputs[i].value !== "") {
          return true;
        } else if (event.keyCode > 47 && event.keyCode < 58) {
          inputs[i].value = event.key;
          if (i !== inputs.length - 1) inputs[i + 1].focus();
          event.preventDefault();
        } else if (event.keyCode > 64 && event.keyCode < 91) {
          inputs[i].value = String.fromCharCode(event.keyCode);
          if (i !== inputs.length - 1) inputs[i + 1].focus();
          event.preventDefault();
        }
      }
    });
  }
}
OTPInput();
const btnOtp = () => {
  const btn = document.querySelector("[btn-otp]");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const link = btn.getAttribute("btn-otp");
    if (!link) return;
    showLoader();
    axios
      .post(link, {})
      .then((res) => {
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
  const newEmail = document.querySelector("[new-email]");
  const btnUpdate = document.querySelector("[btn-update]");
  const link = btnUpdate.getAttribute("btn-update");
  const inputs = document.querySelectorAll("#otp > *[id]");
  if (!link || !btnUpdate || !inputs || inputs.length <= 0 || !newEmail) return;
  btnUpdate.addEventListener("click", () => {
    let codeOtp = "";
    inputs.forEach((input) => (codeOtp += input.value));

    showLoader();
    axios
      .patch(link, {
        email: newEmail.value,
        otp: codeOtp,
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
