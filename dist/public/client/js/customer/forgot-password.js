const main = () => {
  const submit = document.querySelector("[button-submit]");
  if (!submit) return;
  submit.addEventListener("click", () => {
    const link = submit.getAttribute("button-submit");
    if (!link) return;
    const email = document.querySelector("input[name='email']");
    showLoader();
    axios
      .post(link, {
        email: email.value,
      })
      .then((res) => {
        if (res.data.code == 200) {
          const redirect = submit.getAttribute("redirect");
          location.href = `${redirect}?email=${res.data.email}`;
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
