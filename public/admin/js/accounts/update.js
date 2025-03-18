const main = () => {
     const btnSubmit = document.querySelector('[btn-update-account]')
     if (!btnSubmit) return;
     btnSubmit.addEventListener('click', () => {
          questionYesNo(
               'warning', 'Cập nhật tài khoản', 'Bạn có chắc muốn cập nhật tài khoản?', 'Cập nhật', '#4BC18F', 'Hủy', '#FFA09B',
               () => {
                    const fullname = document.querySelector("[name='fullname']")
                    const link = btnSubmit.getAttribute('btn-update-account')
                    const roles = document.querySelector("[name='roles']")
                    const username = document.querySelector("[name='username']")
                    const email = document.querySelector("[name='email']")
                    if (!link || !fullname || !roles || !username || !email) return;
                    showLoader()
                    axios.patch(link, {
                              fullname: fullname.value,
                              roles: roles.value,
                              username: username.value,
                              email: email.value
                         })
                         .then(res => {
                              localStorage.setItem(
                                   "alert-success",
                                   JSON.stringify({
                                        title: 'Cập nhật thành công!',
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
}

main()