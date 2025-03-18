const main = () => {
  const btnSubmit = document.querySelector("[btn-update]");
  if (!btnSubmit) return;
  btnSubmit.addEventListener("click", () => {
    const link = btnSubmit.getAttribute("btn-update");
    const fullname = document.querySelector("[name='fullname']");
    const username = document.querySelector("[name='username']");
    const genders = document.querySelector("[name='genders']");
    const birthday = document.querySelector("[name='birthday']");
    if (!link || !fullname || !username || !genders || !birthday) return;
    showLoader();
    axios
      .patch(link, {
        fullname: fullname.value,
        username: username.value,
        genders: genders.value,
        birthday: birthday.value,
      })
      .then((res) => {
        localStorage.setItem(
          "alert-success",
          JSON.stringify({
            title: "Cập nhật thành công!",
            icon: "success",
          })
        );
        location.reload();
      })
      .catch((error) => {
        localStorage.setItem(
          "alert-error",
          JSON.stringify({
            title: error.response.data.message,
            icon: "warning",
          })
        );
        closeLoader();
        showAlertError();
      });
  });
};

main();
