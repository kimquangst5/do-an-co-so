const listCheckAll = document.querySelectorAll("sl-checkbox[check-all]");

listCheckAll.forEach((item) => {
     item.addEventListener("click", () => {
          const id = item.getAttribute("value");
          const listItem = document.querySelectorAll("sl-checkbox[check-item]");
          listItem.forEach((it) => {
               const itemId = it.getAttribute("value");
               if (itemId == id) it.checked = item.checked;
          });
     });
});

const listItem = document.querySelectorAll("sl-checkbox[check-item]");
listItem.forEach((it) => {
     it.addEventListener("click", () => {
          const itemId = it.getAttribute("value");
          const itemCheck = Array.from(listItem).filter((item) => {
               if (item.value == itemId) return item;
          });
          const itemChecked = Array.from(listItem).filter((item) => {
               if (item.value == itemId && item.checked) return item;
          });
          const checkAll = document.querySelector(
               `sl-checkbox[check-all][value='${itemId}']`
          );
          if (itemCheck.length === itemChecked.length) {
               checkAll.checked = true;
          } else {
               checkAll.checked = false;
          }
     });
});

const main = () => {
     const btnSubmit = document.querySelector("sl-button[btn-update-permission]");
     if (!btnSubmit) return;
     btnSubmit.addEventListener("click", () => {
          showLoader();
          const listCheckAll = document.querySelectorAll("sl-checkbox[check-all]");
          const listCheckItem = document.querySelectorAll("sl-checkbox[check-item]");
          if (listCheckAll.length == 0) return;
          if (listCheckItem.length == 0) return;
          let array = [];
          listCheckAll.forEach((it) => {
               const data = {
                    roleId: it.value,
                    permission: [],
               };
               array.push(data);
          });
          listCheckItem.forEach((item) => {
               if (item.checked) {
                    const dataName = item.parentElement.getAttribute("data-name");
                    const ok = array.find((e) => e.roleId == item.value);
                    ok.permission.push(dataName);
               }
          });
          if (array.length == 0) return;
          const link = btnSubmit.getAttribute("btn-update-permission");
          if (!link) return;
          axios.patch(link, array).then((res) => {
               if (res.status == 200) {
                    location.reload();
                    localStorage.setItem(
                         "alert-success",
                         JSON.stringify({
                              title: "Cập nhật thành công!",
                              icon: "success",
                         })
                    );
               }
          });
     });
};

main();

setTimeout(() => {
     listCheckAll.forEach((check) => {
          const checkItem = Array.from(listItem).filter((it) => {
               if (it.value == check.value) return it;
          });
          const checkItemChecked = Array.from(listItem).filter((it) => {
               if (it.checked && it.value == check.value) return it;
          });
          if (checkItem.length == checkItemChecked.length) check.checked = true;
     });
}, 200);