const btnDelete = () => {
     const listBtn = document.querySelectorAll('[trash]')
     if (!listBtn || listBtn.length == 0) return
     listBtn.forEach(btn => {
          btn.addEventListener('click', () => {
               questionYesNo(
                    'warning', 'Xóa nhóm quyền', 'Bạn có chắc muốn xóa nhóm quyền?', 'Xóa', '#4BC18F', 'Hủy', '#FFA09B',
                    () => {
                         const link = btn.getAttribute('trash')
                         if (!link) return
                         axios.patch(link)
                              .then((res) => {
                                   if (res.status == 200) {
                                        localStorage.setItem(
                                             "alert-success",
                                             JSON.stringify({
                                                  title: "Xóa thành công!",
                                                  icon: "success",
                                             })
                                        );
                                        location.reload()
                                   }
                              })
                              .catch((error) => {
                                   localStorage.setItem(
                                        "alert-error",
                                        JSON.stringify({
                                             title: error.response.data.message,
                                             icon: "warning",
                                        })
                                   );
                                   showAlertError();
                              });
                    })
          })
     })
}
btnDelete()