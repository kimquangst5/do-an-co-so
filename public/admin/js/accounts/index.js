const btnTrash = () => {
     const listBtn = document.querySelectorAll('[trash]')
     if (listBtn.length == 0) return
     listBtn.forEach(btn => {
          btn.addEventListener('click', () => {
               questionYesNo(
                    'warning', 'Xóa tài khoản', 'Bạn có chắc muốn xóa tài khoản?', 'Xóa', '#4BC18F', 'Hủy', '#FFA09B',
                    () => {
                         const link = btn.getAttribute('trash')
                         console.log(link);
                         axios.patch(link)
                              .then(res => {
                                   localStorage.setItem(
                                        "alert-success",
                                        JSON.stringify({
                                             title: 'Xóa tài khoản thành công!',
                                             icon: "success",
                                        })
                                   );
                                   location.reload()
                              })
                              .catch(error => {
                                   localStorage.setItem(
                                        "alert-error",
                                        JSON.stringify({
                                             title: error.response.data.message,
                                             icon: "warning",
                                        })
                                   );
                                   closeLoader()
                                   showAlertError()
                              })

                    })
          })
     })
}

btnTrash()