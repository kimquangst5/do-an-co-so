const main = () => {
  const btnNewRole = document.querySelector("[btn-create-new-role]");
  if (!btnNewRole) return;
  btnNewRole.addEventListener("click", () => {
    const name = document.querySelector("[name='name']").value;
    const description = document.querySelector(
      "sl-textarea[name='description']"
    ).value;
    if (!name) return;
    const link = btnNewRole.getAttribute("btn-create-new-role");
    if (!link) return;
    axios
      .post(link, {
        name,
        description,
      })
      .then((res) => {
        if (res.status == 200) {
          location.reload();
        }
      });
  });
};

main();
