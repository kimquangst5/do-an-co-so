const addQuantity = () => {
     const listBtnAdd = document.querySelectorAll('[btn-add-quantity]')
     if (!listBtnAdd || listBtnAdd.length == 0) return
     listBtnAdd.forEach(btn => {
          btn.addEventListener('click', () => {
               showLoader()
               const link = btn.getAttribute('link')
               if (!link) return
               const itemId = btn.getAttribute('btn-add-quantity')
               if (!itemId) return;
               axios.patch(link, {
                         itemId: itemId
                    })
                    .then(res => {
                         if (res.status == 200) {
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

          })
     })
}

addQuantity()

const btnDecrease = () => {
     const listBtnAdd = document.querySelectorAll('[btn-decrease]')
     if (!listBtnAdd || listBtnAdd.length == 0) return
     listBtnAdd.forEach(btn => {
          btn.addEventListener('click', () => {
               showLoader()
               const link = btn.getAttribute('link')
               if (!link) return
               const itemId = btn.getAttribute('btn-decrease')
               if (!itemId) return;
               axios.patch(link, {
                         itemId: itemId
                    })
                    .then(res => {
                         if (res.status == 200) {
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

          })
     })
}

btnDecrease()

const btnDelete = () => {
     const listBtnAdd = document.querySelectorAll('[btn-trash]')
     if (!listBtnAdd || listBtnAdd.length == 0) return
     listBtnAdd.forEach(btn => {
          btn.addEventListener('click', () => {
               Swal.fire({
                    showCancelButton: true,
                    title: `Xóa sản phẩm khỏi giỏ hàng?`,
                    text: `Bạn chắc muốn xóa sản phẩm này khỏi giỏ hàng?\nHành động này không thể phục hồi!`,
                    icon: "warning",
                    confirmButtonText: "Xóa",
                    confirmButtonColor: "#FFA09B",
                    cancelButtonColor: "#d33",
               }).then((result) => {
                    if (result.isConfirmed) {
                         const link = btn.getAttribute('link')
                         if (!link) return
                         showLoader()
                         const itemId = btn.getAttribute('btn-trash')
                         if (!itemId) return;
                         axios.delete(link)
                              .then(res => {
                                   if (res.status == 200) {
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
                    }
               })


          })
     })
}

btnDelete()