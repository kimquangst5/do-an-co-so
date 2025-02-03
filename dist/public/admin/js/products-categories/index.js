const deleteProCate = () => {
     const listBtnTrash = document.querySelectorAll("sl-button[trash]");
     if (!listBtnTrash) return;
     listBtnTrash.forEach((btn) => {
          btn.addEventListener("click", () => {
               const router = btn.getAttribute("trash");
               if (!router) return;
               axios.patch(router).then((res) => {
                    if (res.status == 200) {
                         localStorage.setItem(
                              "alert-success",
                              JSON.stringify({
                                   title: "Xóa danh mục thành công!",
                                   icon: "success",
                              })
                         );
                         location.reload();
                    }
               });
          });
     });
};
deleteProCate();