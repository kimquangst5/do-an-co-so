const main = () => {
     const btnSubmit = document.querySelector('sl-button[btn-login]')
     const username = document.querySelector("sl-input[name='username']")
     const password = document.querySelector("sl-input[name='password']")
     const link = btnSubmit.getAttribute('btn-login')
     if (!link) return
     btnSubmit.addEventListener('click', () => {
          axios.post(link, {
                    username: username.value,
                    password: password.value
               })
               .then(res => {
                    localStorage.setItem(
                         "alert-success",
                         JSON.stringify({
                              title: 'Đăng nhập thành công!',
                              icon: "success",
                         })
                    );
                    location.href = '/'
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