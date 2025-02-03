const main = () => {

     const btnSubmit = document.querySelector('sl-button[btn-register]')
     if (!btnSubmit) return;
     btnSubmit.addEventListener('click', () => {
          const fullname = document.querySelector("sl-input[name='fullname']")
          const username = document.querySelector("sl-input[name='username']")
          const email = document.querySelector("sl-input[name='email']")
          const password = document.querySelector("sl-input[name='password']")
          const confirmPassword = document.querySelector("sl-input[name='confirm-password']")
          // if (!fullname || !username || !email || !password || !confirmPassword) return;
          // if (!fullname.value || !username.value || !email.value || !password.value || !confirmPassword.value) return;
          const link = btnSubmit.getAttribute('btn-register')

          if (!link) return;
          axios.post(link, {
                    fullname: fullname.value,
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    confirmPassword: confirmPassword.value,
               })
               .then(res => {
                    if (res.status == 200) {
                         localStorage.setItem(
                              "alert-success",
                              JSON.stringify({
                                   title: 'Tạo tài khoản thành công!',
                                   icon: "success",
                              })
                         );
                         location.href = '/'
                    }
               })
               .catch(error => {
                    localStorage.setItem(
                         "alert-error",
                         JSON.stringify({
                              title: error.response.data.message,
                              icon: "warning",
                         })
                    );
                    showAlertError()
               })
     })
}
main()