const main = () => {
  const btnSubmit = document.querySelector("[btn-update-role]");
  if (!btnSubmit) return;
  btnSubmit.addEventListener("click", () => {
    showLoader();
    const name = document.querySelector("[name='name']");
    const description = document.querySelector(
      "sl-textarea[name='description']"
    );
    const link = btnSubmit.getAttribute("btn-update-role");

    if (name.value && link) {
      axios
        .patch(link, {
          name: name.value,
          description: description.value,
        })
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem(
              "alert-success",
              JSON.stringify({
                title: "Cập nhật nhóm quyền thành công!",
                icon: "success",
              })
            );
            location.reload();
          }
        });
    }
  });
};

main();
