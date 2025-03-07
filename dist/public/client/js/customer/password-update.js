const main = () => {
  const oldPassword = document.querySelector("[name='old-password']");
  const newPassword = document.querySelector("[name='new-password']");
  const confirmPassword = document.querySelector("[name='confirm-password']");
  const btnUpdate = document.querySelector("[btn-update]");
  const link = btnUpdate.getAttribute("btn-update");
  if (!link || !oldPassword || !newPassword || !confirmPassword) return;
  btnUpdate.addEventListener("click", () => {
    showLoader();
    axios
      .patch(link, {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem(
            "alert-success",
            JSON.stringify({
              title: "Cập nhật mật khẩu thành công!",
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
