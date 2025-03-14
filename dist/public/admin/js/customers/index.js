const trash = () => {

     const listBtn = document.querySelectorAll('[trash]')
     if (!listBtn || listBtn.length == 0) return
     listBtn.forEach(btn => {
          btn.addEventListener('click', () => {
               questionYesNo(
                    'warning', 'Xóa khách hàng', 'Bạn có chắc muốn xóa khách hàng?', 'Xóa', '#4BC18F', 'Hủy', '#FFA09B',
                    () => {
                         const link = btn.getAttribute('trash')
                         if (!link) return
                         axios.patch(link).then((res) => {
                                   if (res.data.code == 200) {
                                        localStorage.setItem(
                                             "alert-success",
                                             JSON.stringify({
                                                  title: 'Cập nhật thành công!',
                                                  icon: "success",
                                             })
                                        );
                                        location.reload()

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
                    })

          })
     })
}

trash()