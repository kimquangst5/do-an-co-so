const main = () => {
  const submit = document.querySelector("[button-submit]");
  if (!submit) return;
  submit.addEventListener("click", () => {
    const link = submit.getAttribute("button-submit");
    if (!link) return;
    const email = document.querySelector("sl-input[name='email']");
    const password = document.querySelector("sl-input[name='password']");
    const confirmPassword = document.querySelector(
      "sl-input[name='confirm-password']"
    );

    showLoader();
    axios
      .post(link, {
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      })
      .then((res) => {
        if (res.data.code == 200) {
          localStorage.setItem(
            "alert-success",
            JSON.stringify({
              title: "Khôi phục mật khẩu thành công!",
              icon: "success",
            })
          );
          location.href = `/`;
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
