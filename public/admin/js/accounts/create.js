const main = () => {
  const btnNewAccount = document.querySelector("[btn-create-new-account]");
  if (!btnNewAccount) return;
  btnNewAccount.addEventListener("click", () => {
    const fullname = document.querySelector("[name='fullname']");
    const roles = document.querySelector("[name='roles']");
    const usename = document.querySelector("[name='usename']");
    const email = document.querySelector("[name='email']");
    const password = document.querySelector("[name='password']");

    if (!roles || !email || !password) return;
    const link = btnNewAccount.getAttribute("btn-create-new-account");
    if (!link) return;
    axios
      .post(link, {
        fullname: fullname.value,
        roles: roles.value,
        usename: usename.value,
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        if (res.status == 200) {
          location.reload();
        }
      });
  });
};

main();
